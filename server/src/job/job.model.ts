import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Location } from '../location/location.model';
import { User } from '../user/user.model';

@ObjectType()
export class EmployerPublic {
  @Field(() => String)
  contactName: string;

  @Field(() => String)
  contactEmail: string;
}

@ObjectType()
export class CompanyPublic {
  @Field(() => String)
  companyName: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  websiteUrl?: string | null;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  industryType?: string | null;
}

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

  @Field(() => String, { nullable: true })
  locationId?: string | null;

  @Field(() => Location, { nullable: true })
  locationRelation?: Location | null;

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

  @Field(() => EmployerPublic, { nullable: true })
  employer?: EmployerPublic | null;

  @Field(() => CompanyPublic, { nullable: true })
  companyRelation?: CompanyPublic | null;

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

  @Field(() => [Application], { nullable: true })
  applications?: Application[] | null;

  @Field(() => [String], { defaultValue: [] })
  benefits: string[];

  @Field(() => String, { nullable: true })
  responsibilities?: string | null;

  @Field(() => [String], { defaultValue: [] })
  skills: string[];

  @Field(() => String, { nullable: true })
  level?: string | null;

  @Field(() => String, { nullable: true })
  roleCategory?: string | null;

  @Field(() => String, { nullable: true })
  workModel?: string | null;

  @Field(() => String, { nullable: true })
  companyCulture?: string | null;

  @Field(() => String, { nullable: true })
  careerGrowth?: string | null;

  @Field(() => String, { nullable: true })
  interviewProcess?: string | null;

  @Field(() => String, { nullable: true })
  industrySpecificRequirements?: string | null;

  @Field(() => String, { nullable: true })
  compensationCurrency?: string | null;

  @Field(() => String, { nullable: true })
  payPeriod?: string | null;

  @Field(() => String, { nullable: true })
  bonusDetails?: string | null;

  @Field(() => String, { nullable: true })
  equityDetails?: string | null;

  @Field(() => [String], { defaultValue: [] })
  skillsAdvanced: string[];

  @Field(() => [String], { defaultValue: [] })
  skillsIntermediate: string[];

  @Field(() => [String], { defaultValue: [] })
  skillsFoundational: string[];

  @Field(() => [String], { defaultValue: [] })
  softSkills: string[];

  @Field(() => [String], { defaultValue: [] })
  certifications: string[];

  @Field(() => Int, { nullable: true })
  experienceMinYears?: number | null;

  @Field(() => Int, { nullable: true })
  experienceMaxYears?: number | null;

  @Field(() => String, { nullable: true })
  travelRequirement?: string | null;
}

@ObjectType()
export class Application {
  @Field(() => String)
  id: string;

  @Field(() => String)
  jobId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  status: string;

  @Field(() => Date)
  appliedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => Job)
  job: Job;
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
