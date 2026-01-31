import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: jobId } = await params;

        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        });
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        const existedApplication = await prisma.application.findFirst({
            where: {
                userId: session.user.id,
                jobId,
            },
        });
        if (existedApplication) {
            return NextResponse.json({ error: "You have already applied to this job" }, { status: 400 });
        }

        const application = await prisma.application.create({
            data: {
                userId: session.user.id,
                jobId,
                status: "PENDING",
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        console.error("Error applying to job:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
