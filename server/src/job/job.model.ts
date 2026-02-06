import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Job {
    @Field(() => String)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    company: string;

    @Field(() => String)
    location: string;

    @Field(() => String)
    type: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    status: string;

    @Field(() => String, { nullable: true })
    salary?: string | null;

    @Field(() => [String], { defaultValue: [] })
    tags: string[];

    @Field(() => Date)
    postedAt: Date;

    @Field(() => String, { nullable: true })
    employerId?: string | null;

    @Field(() => String, { nullable: true })
    companyId?: string | null;

    @Field(() => String, { nullable: true })
    applyLink?: string | null;

    @Field(() => String, { nullable: true })
    logo?: string | null;

    @Field(() => Int, { nullable: true })
    salaryMin?: number | null;

    @Field(() => Int, { nullable: true })
    salaryMax?: number | null;

    @Field(() => Int)
    applicantsCount?: number;
}

@ObjectType()
export class EmployerStats {
    @Field(() => Int)
    activeJobs: number;

    @Field(() => Int)
    totalApplicants: number;

    @Field(() => Int)
    profileViews: number;

    @Field(() => String)
    avgTimeToHire: string;
}
