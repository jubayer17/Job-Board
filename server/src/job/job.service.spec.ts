import { Test, TestingModule } from '@nestjs/testing';
import { JobService } from './job.service';
import { PrismaService } from '../prisma.service';

describe('JobService', () => {
  let service: JobService;
  let prisma: {
    employer: { findUnique: jest.Mock };
    location: { findUnique: jest.Mock };
    job: { create: jest.Mock; findMany: jest.Mock };
    application: { count: jest.Mock };
    savedJob: { findUnique: jest.Mock; create: jest.Mock; delete: jest.Mock };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        {
          provide: PrismaService,
          useValue: {
            employer: { findUnique: jest.fn() },
            location: { findUnique: jest.fn() },
            job: { create: jest.fn(), findMany: jest.fn() },
            application: { count: jest.fn() },
            savedJob: { findUnique: jest.fn(), create: jest.fn(), delete: jest.fn() },
          },
        },
      ],
    }).compile();

    service = module.get<JobService>(JobService);
    prisma = module.get(PrismaService) as any;
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

      await service.createJob(
        {
          title: 'Software Engineer',
          company: 'Test Company',
          type: 'Full-time',
          description: 'Test description',
          companyId: 'company1',
          locationId: 'loc1',
        } as any,
        'emp1',
        true,
      );

      expect(prisma.job.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            locationId: 'loc1',
            location: 'Dhaka, Bangladesh',
          }),
        }),
      );
    });
  });

  describe('toggleSavedJob', () => {
    it('should save job if not already saved', async () => {
      prisma.savedJob.findUnique.mockResolvedValue(null);
      prisma.savedJob.create.mockResolvedValue({ id: 'saved1', userId: 'user1', jobId: 'job1' });

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
      prisma.savedJob.findUnique.mockResolvedValue({ id: 'saved1', userId: 'user1', jobId: 'job1' });
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
});
