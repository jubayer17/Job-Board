import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id: jobId } = await params;
        const userId = session.user.id;

        const existing = await prisma.savedJob.findUnique({
            where: {
                userId_jobId: {
                    userId,
                    jobId
                }
            }
        });

        if (existing) {
            await prisma.savedJob.delete({
                where: {
                    id: existing.id
                }
            });
            return NextResponse.json({ saved: false });
        } else {
            await prisma.savedJob.create({
                data: {
                    userId,
                    jobId
                }
            });
            return NextResponse.json({ saved: true });
        }
    } catch (error) {
        console.error("Error toggling saved job:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
