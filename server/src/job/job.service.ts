import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJobInput } from './dto/create-job.input';
import { Job } from './job.model';

import { EmployerStats } from './job.model';

@Injectable()
export class JobService {
    constructor(private prisma: PrismaService) { }

    async createJob(data: CreateJobInput, userId: string, isEmployer: boolean = false): Promise<Job> {
        // Fetch the employer and their associated company
        const employer = await this.prisma.employer.findUnique({
            where: { id: userId },
            include: { companies: true },
        });

        if (!employer) {
            throw new Error('Employer not found');
        }

        // Verify company belongs to employer
        const companyExists = employer.companies.find(c => c.id === data.companyId);
        if (!companyExists) {
            throw new Error('Invalid Company ID or Company does not belong to this employer');
        }

        // Handle Location Logic
        // We need to resolve the location name from the ID if provided.
        // This ensures we store a human-readable string in the 'location' field for backward compatibility,
        // while keeping the relation in 'locationId'.
        let resolvedLocationName = data.location;

        if (data.locationId) {
            const locationExists = await this.prisma.location.findUnique({
                where: { id: data.locationId }
            });

            if (!locationExists) {
                throw new Error('Invalid Location ID');
            }

            // Use the standardized name from our database
            resolvedLocationName = locationExists.name;
        }

        const job = await this.prisma.job.create({
            data: {
                ...data,
                location: resolvedLocationName || '',
                employerId: userId,
                status: 'active',
            },
            include: {
                locationRelation: true,
            },
        });

        return job as unknown as Job;
    }

    async findAll(): Promise<Job[]> {
        return this.prisma.job.findMany({
            include: {
                locationRelation: true,
            },
        });
    }

    async findByEmployer(userId: string): Promise<Job[]> {
        return this.prisma.job.findMany({
            where: {
                employerId: userId,
            },
            orderBy: {
                postedAt: 'desc',
            },
            include: {
                locationRelation: true,
            },
        });
    }

    async findByEmployerId(employerId: string): Promise<Job[]> {
        return this.prisma.job.findMany({
            where: {
                employerId: employerId,
            },
            orderBy: {
                postedAt: 'desc',
            },
            include: {
                locationRelation: true,
            },
        });
    }

    async getApplicantsCount(jobId: string): Promise<number> {
        return this.prisma.application.count({
            where: {
                jobId: jobId,
            },
        });
    }

    async getEmployerStats(employerId: string): Promise<EmployerStats> {
        const jobs = await this.prisma.job.findMany({
            where: { employerId },
            include: { _count: { select: { applications: true } } }
        });

        const activeJobs = jobs.filter(j => j.status === 'active').length;
        const totalApplicants = jobs.reduce((sum, job) => sum + job._count.applications, 0);

        return {
            activeJobs,
            totalApplicants,
            profileViews: 124, // Mock data for now
            avgTimeToHire: '14 days' // Mock data for now
        };
    }
}
