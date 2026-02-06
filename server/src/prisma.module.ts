// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Optional: makes PrismaService available everywhere
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
