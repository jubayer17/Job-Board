import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type JobListItem = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary?: string | null;
    logo?: string | null;
    tags: string[];
    postedAt: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    description?: string;
};

// GET: Fetch filtered jobs
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || undefined;
        const type = searchParams.get("type") || undefined;
        const location = searchParams.get("location") || undefined;
        const sort = (searchParams.get("sort") as "asc" | "desc") || "desc";
        const minSalary = searchParams.get("minSalary") ? Number(searchParams.get("minSalary")) : undefined;
        const maxSalary = searchParams.get("maxSalary") ? Number(searchParams.get("maxSalary")) : undefined;

        const graphqlUrl = process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
            : "https://job-board-t9m8.onrender.com/graphql";

        const res = await fetch(graphqlUrl, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                query: `
                    query Jobs {
                        jobs {
                            id
                            title
                            company
                            location
                            type
                            description
                            salary
                            logo
                            tags
                            postedAt
                            salaryMin
                            salaryMax
                        }
                    }
                `,
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Backend returned ${res.status}`);
            return NextResponse.json([], { status: 200 });
        }

        const payload = (await res.json()) as {
            data?: { jobs?: JobListItem[] };
            errors?: Array<{ message?: string }>;
        };

        if (payload.errors?.length) {
            return NextResponse.json(
                { error: payload.errors.map(e => e.message).filter(Boolean).join("; ") || "Backend GraphQL error" },
                { status: 502 }
            );
        }

        let jobs = payload.data?.jobs ?? [];

        if (type && type !== "All Types") {
            jobs = jobs.filter(j => (j.type || "").toLowerCase() === type.toLowerCase());
        }

        if (location && location !== "All Locations") {
            const needle = location.toLowerCase();
            jobs = jobs.filter(j => (j.location || "").toLowerCase().includes(needle));
        }

        if (typeof minSalary === "number" && !Number.isNaN(minSalary)) {
            jobs = jobs.filter(j => (j.salaryMax ?? 0) >= minSalary);
        }

        if (typeof maxSalary === "number" && !Number.isNaN(maxSalary)) {
            jobs = jobs.filter(j => (j.salaryMax ?? 0) <= maxSalary);
        }

        if (search?.trim()) {
            const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
            jobs = jobs.filter(j => {
                const haystack = [
                    j.title,
                    j.company,
                    j.location,
                    j.description || "",
                    ...(j.tags || []),
                ].join(" ").toLowerCase();
                return terms.every(t => haystack.includes(t));
            });
        }

        jobs = jobs.sort((a, b) => {
            const aTime = Date.parse(a.postedAt);
            const bTime = Date.parse(b.postedAt);
            return sort === "asc" ? aTime - bTime : bTime - aTime;
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json([], { status: 200 });
    }
}

// POST: Create new job
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const required = ['title', 'company', 'location', 'type', 'description'];

        if (required.some(field => !body[field])) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Find employer and company
        const employer = await prisma.employer.findUnique({
            where: { id: session.user.id },
            include: { companies: true }
        });

        if (!employer || !employer.companies[0]) {
            return NextResponse.json({ error: "Employer/Company not found" }, { status: 403 });
        }

        const job = await prisma.job.create({
            data: {
                ...body,
                employerId: session.user.id,
                companyId: employer.companies[0].id
            }
        });
        return NextResponse.json(job);
    } catch (error) {
        console.error("Create Job Error:", error);
        return NextResponse.json({ error: "Creation failed" }, { status: 500 });
    }
}
