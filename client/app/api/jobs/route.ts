import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getJobs } from "@/lib/services/job";

// GET: Fetch filtered jobs
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const jobs = await getJobs({
            search: searchParams.get("search") || undefined,
            type: searchParams.get("type") || undefined,
            location: searchParams.get("location") || undefined,
            sort: (searchParams.get("sort") as "asc" | "desc") || "desc",
            minSalary: searchParams.get("minSalary") ? Number(searchParams.get("minSalary")) : undefined,
            maxSalary: searchParams.get("maxSalary") ? Number(searchParams.get("maxSalary")) : undefined,
        });
        return NextResponse.json(jobs);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
