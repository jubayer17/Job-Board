import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "9");

    const jobs = await prisma.job.findMany({
      where: { companyId: id },
      orderBy: { postedAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        type: true,
        location: true,
        salaryMin: true,
        salaryMax: true,
        postedAt: true,
        description: true,
        company: true,
        logo: true,
        tags: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
