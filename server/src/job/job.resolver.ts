import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job, EmployerStats, Application } from './job.model';
import { CreateJobInput } from './dto/create-job.input';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job])
  async jobs(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Query(() => Job, { nullable: true })
  async job(@Args('id') id: string): Promise<Job | null> {
    return this.jobService.findOne(id);
  }

  @Query(() => [Job])
  async myJobs(@Args('userId') userId: string): Promise<Job[]> {
    return this.jobService.findByEmployer(userId);
  }

  @Query(() => [Job])
  async employerJobs(@Args('employerId') employerId: string): Promise<Job[]> {
    return this.jobService.findByEmployerId(employerId);
  }

  @Query(() => EmployerStats)
  async employerStats(
    @Args('employerId') employerId: string,
  ): Promise<EmployerStats> {
    return this.jobService.getEmployerStats(employerId);
  }

  @Query(() => [Application])
  async employerApplications(
    @Args('employerId') employerId: string,
  ): Promise<Application[]> {
    return this.jobService.getEmployerApplications(employerId);
  }

  @Query(() => [Application])
  async jobApplications(
    @Args('jobId') jobId: string,
    @Args('employerId') employerId: string,
  ): Promise<Application[]> {
    return this.jobService.getJobApplicationsForEmployer(jobId, employerId);
  }

  @Mutation(() => Job)
  async createJob(
    @Args('data') data: CreateJobInput,
    @Args('employerId') employerId: string,
    @Args('isEmployer', { nullable: true }) isEmployer: boolean,
  ): Promise<Job> {
    if (isEmployer === false) {
      throw new Error('Only employers can create jobs');
    }
    const job = await this.jobService.createJob(
      data,
      employerId,
      isEmployer === true,
    );
    return job;
  }

  @ResolveField(() => Number)
  async applicantsCount(@Parent() job: Job): Promise<number> {
    const jobWithCount = job as unknown as {
      _count?: { applications?: number };
    };
    if (typeof jobWithCount._count?.applications === 'number') {
      return jobWithCount._count.applications;
    }
    return this.jobService.getApplicantsCount(job.id);
  }
}
