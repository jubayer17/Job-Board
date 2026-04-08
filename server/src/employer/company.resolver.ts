import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PrismaService } from '../prisma.service';
import { Company } from './company.model';
import { Job } from '../job/job.model';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Company, { name: 'company', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  @ResolveField(() => [Job], { nullable: true })
  async jobs(@Parent() company: Company): Promise<Job[]> {
    const rows = await this.prisma.job.findMany({
      where: { companyId: company.id },
      orderBy: { postedAt: 'desc' },
      include: {
        locationRelation: true,
        _count: { select: { applications: true } },
      },
    });
    return rows as unknown as Job[];
  }
}
