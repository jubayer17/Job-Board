import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobInput {
  @Field()
  title: string;

  @Field()
  company: string;

  @Field({ nullable: true })
  location?: string;

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

  @Field({ nullable: true })
  logoPublicId?: string;

  @Field({ nullable: true })
  logoOriginalName?: string;

  @Field({ nullable: true })
  logoUploadedAt?: Date;

  @Field({ nullable: true })
  roleCategory?: string;

  @Field({ nullable: true })
  workModel?: string;

  @Field({ nullable: true })
  companyCulture?: string;

  @Field({ nullable: true })
  careerGrowth?: string;

  @Field({ nullable: true })
  interviewProcess?: string;

  @Field({ nullable: true })
  industrySpecificRequirements?: string;

  @Field({ nullable: true })
  compensationCurrency?: string;

  @Field({ nullable: true })
  payPeriod?: string;

  @Field({ nullable: true })
  bonusDetails?: string;

  @Field({ nullable: true })
  equityDetails?: string;

  @Field(() => [String], { nullable: true })
  skillsAdvanced?: string[];

  @Field(() => [String], { nullable: true })
  skillsIntermediate?: string[];

  @Field(() => [String], { nullable: true })
  skillsFoundational?: string[];

  @Field(() => [String], { nullable: true })
  softSkills?: string[];

  @Field(() => [String], { nullable: true })
  certifications?: string[];

  @Field({ nullable: true })
  experienceMinYears?: number;

  @Field({ nullable: true })
  experienceMaxYears?: number;

  @Field({ nullable: true })
  travelRequirement?: string;

  @Field()
  companyId: string;

  @Field()
  locationId: string;
}
