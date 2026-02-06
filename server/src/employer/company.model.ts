import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Company {
    @Field()
    id: string;

    @Field()
    companyName: string;

    @Field({ nullable: true })
    tradeLicense?: string;

    @Field({ nullable: true })
    yearOfEstablishment?: string;

    @Field({ nullable: true })
    industryType?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    websiteUrl?: string;

    @Field()
    employerId: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
