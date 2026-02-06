import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [JobService, JobResolver],
})
export class JobModule {}
