import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerResolver } from './employer.resolver';

@Module({
  providers: [EmployerResolver, EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
