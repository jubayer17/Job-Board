import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const locations = await prisma.job.findMany({
            select: {
                location: true,
            },
            distinct: ['location'],
            orderBy: {
                location: 'asc',
            }
        });

        return NextResponse.json(locations.map(j => j.location));
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
