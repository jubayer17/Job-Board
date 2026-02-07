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

        return this.prisma.job.create({
            data: {
                ...data,
                employerId: userId,
                status: 'active',
            },
        });
    }

    async findAll(): Promise<Job[]> {
        return this.prisma.job.findMany();
    }

    async findByEmployer(userId: string): Promise<Job[]> {
        return this.prisma.job.findMany({
            where: {
                employerId: userId,
            },
            orderBy: {
                postedAt: 'desc',
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
