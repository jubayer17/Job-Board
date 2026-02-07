import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

// Types
export type JobWithPoster = {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    vacancies: number | null;
    experience: string | null;
    education: string | null;
    workplace: string | null;
    jobContext: string | null;
    gender: string | null;
    deadline: Date | null;
    description: string;
    salary: string | null;
    logo: string | null;
    tags: string[];
    postedAt: Date;
    applyLink: string | null;
    employer: { contactName: string; contactEmail: string; };
    companyRelation: { companyName: string; };
};

export type JobFilters = {
    search?: string; type?: string; location?: string;
    sort?: "asc" | "desc"; minSalary?: number; maxSalary?: number;
};

// Fetch single job
export const getJobById = cache(async (id: string): Promise<JobWithPoster | null> => {
    try {
        const job = await prisma.job.findUnique({
            where: { id },
            include: {
                employer: { select: { contactName: true, contactEmail: true } },
                companyRelation: { select: { companyName: true } }
            }
        });
        return job as unknown as JobWithPoster | null;
    } catch (error) {
        console.error("Fetch Job Error:", error);
        return null;
    }
});

// Check application status
export const getApplicationStatus = cache(async (jobId: string, userId: string) => {
    try {
        const app = await prisma.application.findFirst({ where: { jobId, userId } });
        return app?.status || null;
    } catch { return null; }
});

// Fetch filtered jobs
export const getJobs = cache(async (filters: JobFilters = {}) => {
    const { search, type, location, sort = "desc", minSalary, maxSalary } = filters;
    const where: any = {};

    // Search: Title or Company (Multi-word support)
    if (search?.trim()) {
        const terms = search.trim().split(/\s+/).filter(Boolean);
        if (terms.length) {
            where.AND = terms.map(term => ({
                OR: [
                    { title: { contains: term, mode: "insensitive" } },
                    { company: { contains: term, mode: "insensitive" } }
                ]
            }));
        }
    }

    // Filters
    if (type && type !== "All Types") where.type = type;
    if (location && location !== "All Locations") where.location = { contains: location, mode: "insensitive" };
    if (minSalary) where.salaryMax = { gte: minSalary };
    if (maxSalary) where.salaryMax = { lte: maxSalary };

    try {
        const jobs = await prisma.job.findMany({
            where,
            orderBy: { postedAt: sort },
            include: {
                employer: { select: { contactName: true, contactEmail: true } },
                companyRelation: { select: { companyName: true } }
            }
        });
        return jobs as unknown as JobWithPoster[];
    } catch (error) {
        console.error("Fetch Jobs Error:", error);
        return [];
    }
});

// Get unique locations
export const getUniqueLocations = cache(async () => {
    try {
        const jobs = await prisma.job.findMany({
            select: { location: true }, distinct: ["location"], orderBy: { location: "asc" }
        });
        return jobs.map(j => j.location);
    } catch { return []; }
});
