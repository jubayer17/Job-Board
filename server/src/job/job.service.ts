import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateJobInput } from './dto/create-job.input';
import { Application, Job } from './job.model';

import { EmployerStats } from './job.model';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(
    data: CreateJobInput,
    userId: string,
    isEmployer: boolean = false,
  ): Promise<Job> {
    if (!isEmployer) {
      throw new Error('Employer access required');
    }

    // Fetch the employer and their associated company
    const employer = await this.prisma.employer.findUnique({
      where: { id: userId },
      include: { companies: true },
    });

    if (!employer) {
      throw new Error('Employer not found');
    }

    // Verify company belongs to employer
    const companyExists = employer.companies.find(
      (c) => c.id === data.companyId,
    );
    if (!companyExists) {
      throw new Error(
        'Invalid Company ID or Company does not belong to this employer',
      );
    }

    // Handle Location Logic
    // We need to resolve the location name from the ID if provided.
    // This ensures we store a human-readable string in the 'location' field for backward compatibility,
    // while keeping the relation in 'locationId'.
    let resolvedLocationName = data.location;

    if (data.locationId) {
      const locationExists = await this.prisma.location.findUnique({
        where: { id: data.locationId },
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
    const jobs = await this.prisma.job.findMany({
      include: {
        locationRelation: true,
        _count: { select: { applications: true } },
      },
    });
    return jobs as unknown as Job[];
  }

  async findOne(id: string): Promise<Job | null> {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        locationRelation: true,
        employer: { select: { contactName: true, contactEmail: true } },
        companyRelation: {
          select: {
            companyName: true,
            description: true,
            websiteUrl: true,
            address: true,
            industryType: true,
          },
        },
        _count: { select: { applications: true } },
      },
    });

    return job as unknown as Job | null;
  }

  async findByEmployer(userId: string): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        employerId: userId,
      },
      orderBy: {
        postedAt: 'desc',
      },
      include: {
        locationRelation: true,
        _count: { select: { applications: true } },
      },
    });
    return jobs as unknown as Job[];
  }

  async findByEmployerId(employerId: string): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      where: {
        employerId: employerId,
      },
      orderBy: {
        postedAt: 'desc',
      },
      include: {
        locationRelation: true,
        _count: { select: { applications: true } },
      },
    });
    return jobs as unknown as Job[];
  }

  async getApplicantsCount(jobId: string): Promise<number> {
    return this.prisma.application.count({
      where: {
        jobId: jobId,
      },
    });
  }

  async getJobApplicationsForEmployer(
    jobId: string,
    employerId: string,
  ): Promise<Application[]> {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      select: { employerId: true },
    });

    if (!job) {
      throw new Error('Job not found');
    }

    if (job.employerId !== employerId) {
      throw new Error('Employer access required');
    }

    const applications = await this.prisma.application.findMany({
      where: { jobId },
      include: {
        user: true,
        job: true,
      },
      orderBy: { appliedAt: 'desc' },
    });
    return applications as unknown as Application[];
  }

  async getEmployerApplications(employerId: string): Promise<Application[]> {
    const applications = await this.prisma.application.findMany({
      where: { job: { employerId } },
      include: {
        user: true,
        job: true,
      },
      orderBy: { appliedAt: 'desc' },
    });
    return applications as unknown as Application[];
  }

  async getEmployerStats(employerId: string): Promise<EmployerStats> {
    const jobs = await this.prisma.job.findMany({
      where: { employerId },
      include: { _count: { select: { applications: true } } },
    });

    const activeJobs = jobs.filter((j) => j.status === 'active').length;
    const totalApplicants = jobs.reduce(
      (sum, job) => sum + job._count.applications,
      0,
    );

    return {
      activeJobs,
      totalApplicants,
      profileViews: 124, // Mock data for now
      avgTimeToHire: '14 days', // Mock data for now
    };
  }

  async toggleSavedJob(jobId: string, userId: string): Promise<boolean> {
    const existing = await this.prisma.savedJob.findUnique({
      where: {
        userId_jobId: {
          userId,
          jobId,
        },
      },
    });

    if (existing) {
      await this.prisma.savedJob.delete({
        where: { id: existing.id },
      });
      return false;
    } else {
      await this.prisma.savedJob.create({
        data: {
          userId,
          jobId,
        },
      });
      return true;
    }
  }
}
