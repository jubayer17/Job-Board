import { Test, TestingModule } from '@nestjs/testing';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';

describe('JobResolver', () => {
  let resolver: JobResolver;
  let jobService: { findOne: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobResolver,
        {
          provide: JobService,
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    resolver = module.get<JobResolver>(JobResolver);
    jobService = module.get(JobService);
  });

  it('returns job for valid id', async () => {
    jobService.findOne.mockResolvedValue({ id: 'job1' });

    const result = await resolver.job('job1');

    expect(jobService.findOne).toHaveBeenCalledWith('job1');
    expect(result).toEqual({ id: 'job1' });
  });

  it('returns null when job not found', async () => {
    jobService.findOne.mockResolvedValue(null);

    const result = await resolver.job('missing');

    expect(jobService.findOne).toHaveBeenCalledWith('missing');
    expect(result).toBeNull();
  });
});
