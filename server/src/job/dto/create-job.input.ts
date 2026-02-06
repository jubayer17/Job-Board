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
}
