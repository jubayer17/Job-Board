import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job, EmployerStats } from './job.model';
import { CreateJobInput } from './dto/create-job.input';

@Resolver(() => Job)
export class JobResolver {
    constructor(private readonly jobService: JobService) { }

    @Query(() => [Job])
    async jobs(): Promise<Job[]> {
        return this.jobService.findAll();
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
    async employerStats(@Args('employerId') employerId: string): Promise<EmployerStats> {
        return this.jobService.getEmployerStats(employerId);
    }

    @Mutation(() => Job)
    async createJob(
        @Args('data') data: CreateJobInput,
        @Args('employerId') employerId: string,
        @Args('isEmployer', { nullable: true }) isEmployer: boolean,
    ): Promise<Job> {
        return this.jobService.createJob(data, employerId, true);
    }

    @ResolveField(() => Number)
    async applicantsCount(@Parent() job: Job): Promise<number> {
        return this.jobService.getApplicantsCount(job.id);
    }
}
