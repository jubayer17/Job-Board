import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
    salaryMin: number | null;
    salaryMax: number | null;
    logo: string | null;
    tags: string[];
    postedAt: Date;
    applyLink: string | null;
    benefits: string[];
    responsibilities: string | null;
    skills: string[];
    level: string | null;
    employer: { contactName: string; contactEmail: string; };
    companyRelation: {
        companyName: string;
        description: string | null;
        websiteUrl: string | null;
        address: string | null;
        industryType: string | null;
    };
    searchHighlight?: string;
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
                companyRelation: {
                    select: {
                        companyName: true,
                        description: true,
                        websiteUrl: true,
                        address: true,
                        industryType: true,
                    }
                }
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

// Check saved status
export const getSavedStatus = cache(async (jobId: string, userId: string) => {
    try {
        const saved = await prisma.savedJob.findUnique({
            where: {
                userId_jobId: {
                    userId,
                    jobId
                }
            }
        });
        return !!saved;
    } catch { return false; }
});

// Fetch filtered jobs with Full-Text Search and Ranking
export const getJobs = cache(async (filters: JobFilters = {}) => {
    const { search, type, location, sort = "desc", minSalary, maxSalary } = filters;
    const where: any = {};

    // Standard Filters
    if (type && type !== "All Types") where.type = type;
    if (location && location !== "All Locations") where.location = { contains: location, mode: "insensitive" };
    if (minSalary) where.salaryMax = { gte: minSalary };
    if (maxSalary) where.salaryMax = { lte: maxSalary };

    try {
        let jobs: JobWithPoster[] = [];

        // If search term is present, use Full-Text Search with Ranking
        if (search?.trim()) {
            const searchTerm = search.trim();

            // Log analytics (fire and forget)
            // @ts-ignore - SearchAnalytics might not be in client types yet
            if (prisma.searchAnalytics) {
                // @ts-ignore
                prisma.searchAnalytics.create({
                    data: { query: searchTerm, results: 0 } // We update results later or just log query
                }).catch(() => { });
            }

            // Raw SQL for Full-Text Search
            // We search in title, company, description, and location
            // Ranking: Exact Phrase (phraseto_tsquery) > Proximity (ts_rank_cd)
            // We require ALL words to be present (plainto_tsquery handles this by default)

            // Note: The index definition must match exactly:
            // to_tsvector('english', coalesce(title, '') || ' ' || coalesce(company, '') || ' ' || coalesce(description, '') || ' ' || coalesce(location, ''))

            const vectorSql = `to_tsvector('english', coalesce(title, '') || ' ' || coalesce(company, '') || ' ' || coalesce(description, '') || ' ' || coalesce(location, ''))`;

            const searchResults = await prisma.$queryRaw<{ id: string, rank: number, headline: string }[]>`
                WITH search_query AS (
                    SELECT plainto_tsquery('english', ${searchTerm}) as query,
                           phraseto_tsquery('english', ${searchTerm}) as phrase_query
                )
                SELECT 
                    id, 
                    ts_rank_cd(${Prisma.raw(vectorSql)}, sq.query) + 
                    (CASE WHEN ${Prisma.raw(vectorSql)} @@ sq.phrase_query THEN 1.0 ELSE 0.0 END) as rank,
                    ts_headline('english', description, sq.query, 'StartSel=<b>, StopSel=</b>, MaxWords=35, MinWords=15, ShortWord=3, HighlightAll=FALSE, MaxFragments=3, FragmentDelimiter="..."') as headline
                FROM "Job", search_query sq
                WHERE ${Prisma.raw(vectorSql)} @@ sq.query
                ORDER BY rank DESC
                LIMIT 1000;
            `;

            if (searchResults.length === 0) return [];

            const searchMap = new Map(searchResults.map(r => [r.id, r]));
            const ids = searchResults.map(r => r.id);

            // Apply other filters using Prisma
            const dbJobs = await prisma.job.findMany({
                where: {
                    ...where,
                    id: { in: ids }
                },
                include: {
                    employer: { select: { contactName: true, contactEmail: true } },
                    companyRelation: { select: { companyName: true } }
                }
            });

            // Sort by Rank (since findMany doesn't preserve order of 'in') and attach highlight
            jobs = dbJobs.map(job => ({
                ...job,
                searchHighlight: searchMap.get(job.id)?.headline
            })).sort((a, b) => (searchMap.get(b.id)?.rank || 0) - (searchMap.get(a.id)?.rank || 0)) as unknown as JobWithPoster[];

        } else {
            // Standard Prisma Query without Search
            const dbJobs = await prisma.job.findMany({
                where,
                orderBy: { postedAt: sort },
                include: {
                    employer: { select: { contactName: true, contactEmail: true } },
                    companyRelation: { select: { companyName: true } }
                }
            });
            jobs = dbJobs as unknown as JobWithPoster[];
        }

        return jobs;
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
