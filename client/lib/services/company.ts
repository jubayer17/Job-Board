import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type CompanySummary = {
    id: string;
    name: string;
    industry?: string | null;
    location?: string | null;
    description?: string | null;
    websiteUrl?: string | null;
    jobsCount: number;
    latestLogo?: string | null;
};

export type CompanyJob = {
    id: string;
    title: string;
    type: string;
    location: string;
    salaryMin: number | null;
    salaryMax: number | null;
    postedAt: Date;
    description: string;
    company: string;
    logo: string | null;
    tags: string[];
};

export const getCompanies = cache(async (): Promise<CompanySummary[]> => {
    try {
        const companies = await prisma.company.findMany({
            select: {
                id: true,
                companyName: true,
                industryType: true,
                address: true,
                description: true,
                websiteUrl: true,
                _count: { select: { jobs: true } },
                jobs: {
                    select: { logo: true, postedAt: true },
                    orderBy: { postedAt: "desc" },
                    take: 1,
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return companies.map((c) => ({
            id: c.id,
            name: c.companyName,
            industry: c.industryType,
            location: c.address,
            description: c.description,
            websiteUrl: c.websiteUrl,
            jobsCount: c._count.jobs,
            latestLogo: c.jobs?.[0]?.logo ?? null,
        }));
    } catch (e) {
        console.error("getCompanies error:", e);
        return [];
    }
});

export const getCompanyJobs = cache(async (companyId: string, limit = 9): Promise<CompanyJob[]> => {
    try {
        const jobs = await prisma.job.findMany({
            where: { companyId },
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

        return jobs as unknown as CompanyJob[];
    } catch (e) {
        console.error("getCompanyJobs error:", e);
        return [];
    }
});

