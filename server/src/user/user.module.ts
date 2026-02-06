// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule], // PrismaService comes from here
  providers: [UserService, UserResolver],
})
export class UserModule { }
