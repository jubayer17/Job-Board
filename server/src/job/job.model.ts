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

    @Field(() => Date, { nullable: true })
    deadline?: Date | null;

    @Field(() => Int, { nullable: true })
    vacancies?: number | null;

    @Field(() => String, { nullable: true })
    experience?: string | null;

    @Field(() => String, { nullable: true })
    education?: string | null;

    @Field(() => String, { nullable: true })
    workplace?: string | null;

    @Field(() => String, { nullable: true })
    jobContext?: string | null;

    @Field(() => String, { nullable: true })
    gender?: string | null;

    @Field(() => String, { nullable: true })
    employerId?: string | null;

    @Field(() => String, { nullable: true })
    companyId?: string | null;

    @Field(() => String, { nullable: true })
    applyLink?: string | null;

    @Field(() => String, { nullable: true })
    logo?: string | null;

    @Field(() => String, { nullable: true })
    logoPublicId?: string | null;

    @Field(() => String, { nullable: true })
    logoOriginalName?: string | null;

    @Field(() => Date, { nullable: true })
    logoUploadedAt?: Date | null;

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
