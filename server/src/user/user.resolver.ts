// src/user/user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { LoginInput } from './dto/login.input';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    // Add this Query just to satisfy GraphQL
    @Query(() => String)
    hello(): string {
        return "Hello, GraphQL is working!";
    }

    @Mutation(() => User)
    async signUp(@Args('data') data: CreateUserInput): Promise<User> {
        return this.userService.createUser(data);
    }

    @Mutation(() => User)
    async login(@Args('data') data: LoginInput): Promise<User> {
        return this.userService.login(data);
    }
}
