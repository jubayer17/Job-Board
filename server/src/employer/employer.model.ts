import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from './company.model';

@ObjectType()
export class Employer {
  @Field()
  id: string;

  @Field()
  contactName: string;

  @Field()
  contactDesignation: string;

  @Field()
  contactEmail: string;

  @Field()
  contactMobile: string;

  @Field(() => [Company], { nullable: true })
  companies?: Company[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
