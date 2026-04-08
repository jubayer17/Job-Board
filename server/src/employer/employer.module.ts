import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerResolver } from './employer.resolver';
import { CompanyResolver } from './company.resolver';

@Module({
  providers: [EmployerResolver, CompanyResolver, EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
