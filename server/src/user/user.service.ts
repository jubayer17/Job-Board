// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async login(data: LoginInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user || !user.password) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return {
            ...user,
            name: user.name ?? '',
            email: user.email ?? '',
        };
    }

    async createUser(data: CreateUserInput): Promise<User> {
        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        return {
            ...user,
            name: user.name ?? '',
            email: user.email ?? '',

        };
    }
}
