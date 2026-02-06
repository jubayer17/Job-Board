import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { EmployerService } from './employer.service';
import { Employer } from './employer.model';
import { CreateEmployerInput } from './dto/create-employer.input';

@Resolver(() => Employer)
export class EmployerResolver {
  constructor(private readonly employerService: EmployerService) { }

  @Query(() => Employer, { name: 'employer' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.employerService.findOne(id);
  }

  @Mutation(() => Employer)
  async createEmployer(@Args('createEmployerInput') createEmployerInput: CreateEmployerInput) {
    return this.employerService.create(createEmployerInput);
  }

  @Mutation(() => Employer, { nullable: true })
  async employerLogin(
    @Args('contactEmail') contactEmail: string,
    @Args('password') password: string,
  ) {
    return this.employerService.validateLogin(contactEmail, password);
  }
}
