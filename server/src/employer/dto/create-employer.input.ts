import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployerInput {
  @Field()
  contactName: string;

  @Field()
  contactDesignation: string;

  @Field()
  contactEmail: string;

  @Field()
  contactMobile: string;

  @Field()
  password: string;

  // Company Details
  @Field()
  companyName: string;

  @Field()
  tradeLicense: string;

  @Field()
  yearOfEstablishment: string;

  @Field()
  industryType: string;

  @Field()
  description: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  websiteUrl?: string;
}
