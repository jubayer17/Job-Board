import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
    @Field()
    title: string;

    @Field()
    company: string;

    @Field()
    location: string;

    @Field()
    type: string;

    @Field()
    description: string;

    @Field(() => String, { nullable: true })
    salary?: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];

    @Field({ nullable: true })
    deadline?: Date;

    @Field({ nullable: true })
    vacancies?: number;

    @Field({ nullable: true })
    experience?: string;

    @Field({ nullable: true })
    education?: string;

    @Field({ nullable: true })
    workplace?: string;

    @Field({ nullable: true })
    jobContext?: string;

    @Field({ nullable: true })
    gender?: string;

    @Field({ nullable: true })
    applyLink?: string;

    @Field({ nullable: true })
    logo?: string;

    @Field()
    companyId: string;
}
