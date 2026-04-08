import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { PrismaService } from '../prisma.service';
import { CreateJobInput } from './dto/create-job.input';

describe('JobService', () => {
  let service: JobService;
  type PrismaMock = {
    employer: { findUnique: jest.Mock };
    location: { findUnique: jest.Mock };
    job: { create: jest.Mock; findMany: jest.Mock; findUnique: jest.Mock };
    application: { count: jest.Mock; findMany: jest.Mock };
    savedJob: { findUnique: jest.Mock; create: jest.Mock; delete: jest.Mock };
  };
  let prisma: PrismaMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: PrismaService,
          useValue: {
            employer: { findUnique: jest.fn() },
            location: { findUnique: jest.fn() },
            job: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
            application: { count: jest.fn(), findMany: jest.fn() },
            savedJob: {
              findUnique: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    prisma = module.get<PrismaMock>(PrismaService);
  });

  describe('createJob', () => {
    it('creates job with resolved location name when locationId is provided', async () => {
      prisma.employer.findUnique.mockResolvedValue({
        id: 'emp1',
        companies: [{ id: 'company1' }],
      });

      prisma.location.findUnique.mockResolvedValue({
        id: 'loc1',
        name: 'Dhaka, Bangladesh',
      });

      prisma.job.create.mockResolvedValue({
        id: 'job1',
        locationId: 'loc1',
        location: 'Dhaka, Bangladesh',
      });

      const input: CreateJobInput = {
        title: 'Software Engineer',
        company: 'Test Company',
        type: 'Full-time',
        description: 'Test description',
        companyId: 'company1',
        locationId: 'loc1',
      };

      await service.createJob(input, 'emp1', true);

      const calls = prisma.job.create.mock.calls as unknown as Array<[unknown]>;
      const callArg = calls[0]?.[0] as {
        data?: { locationId?: string; location?: string };
      };
      expect(callArg.data?.locationId).toBe('loc1');
      expect(callArg.data?.location).toBe('Dhaka, Bangladesh');
    });
  });

  describe('toggleSavedJob', () => {
    it('should save job if not already saved', async () => {
      prisma.savedJob.findUnique.mockResolvedValue(null);
      prisma.savedJob.create.mockResolvedValue({
        id: 'saved1',
        userId: 'user1',
        jobId: 'job1',
      });

      const result = await service.toggleSavedJob('job1', 'user1');

      expect(prisma.savedJob.findUnique).toHaveBeenCalledWith({
        where: { userId_jobId: { userId: 'user1', jobId: 'job1' } },
      });
      expect(prisma.savedJob.create).toHaveBeenCalledWith({
        data: { userId: 'user1', jobId: 'job1' },
      });
      expect(result).toBe(true);
    });

    it('should remove saved job if already saved', async () => {
      prisma.savedJob.findUnique.mockResolvedValue({
        id: 'saved1',
        userId: 'user1',
        jobId: 'job1',
      });
      prisma.savedJob.delete.mockResolvedValue({ id: 'saved1' });

      const result = await service.toggleSavedJob('job1', 'user1');

      expect(prisma.savedJob.findUnique).toHaveBeenCalledWith({
        where: { userId_jobId: { userId: 'user1', jobId: 'job1' } },
      });
      expect(prisma.savedJob.delete).toHaveBeenCalledWith({
        where: { id: 'saved1' },
      });
      expect(result).toBe(false);
    });
  });

  describe('getJobApplicationsForEmployer', () => {
    it('throws when job does not exist', async () => {
      prisma.job.findUnique.mockResolvedValue(null);

      await expect(
        service.getJobApplicationsForEmployer('job1', 'emp1'),
      ).rejects.toThrow('Job not found');
    });

    it('throws when employer does not own the job', async () => {
      prisma.job.findUnique.mockResolvedValue({ employerId: 'emp2' });

      await expect(
        service.getJobApplicationsForEmployer('job1', 'emp1'),
      ).rejects.toThrow('Employer access required');
    });

    it('returns applications with user + job when authorized', async () => {
      prisma.job.findUnique.mockResolvedValue({ employerId: 'emp1' });
      prisma.application.findMany.mockResolvedValue([
        {
          id: 'app1',
          jobId: 'job1',
          userId: 'user1',
          status: 'PENDING',
          appliedAt: new Date(),
          user: { id: 'user1' },
          job: { id: 'job1' },
        },
      ]);

      const result = await service.getJobApplicationsForEmployer(
        'job1',
        'emp1',
      );

      expect(prisma.application.findMany).toHaveBeenCalledWith({
        where: { jobId: 'job1' },
        include: { user: true, job: true },
        orderBy: { appliedAt: 'desc' },
      });
      expect(result).toHaveLength(1);
    });
  });

  describe('getEmployerApplications', () => {
    it('returns applications scoped to employer jobs with user + job', async () => {
      prisma.application.findMany.mockResolvedValue([]);

      await service.getEmployerApplications('emp1');

      expect(prisma.application.findMany).toHaveBeenCalledWith({
        where: { job: { employerId: 'emp1' } },
        include: { user: true, job: true },
        orderBy: { appliedAt: 'desc' },
      });
    });
  });
});
