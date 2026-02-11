import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                isEmployer: { label: "Is Employer", type: "text" }
            },
            async authorize(credentials) {
                // Step 1: Check if email and password are provided
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Check if this is an employer login
                const isEmployer = credentials?.isEmployer === "true";

                if (isEmployer) {
                    const endpoint = process.env.SERVER_GRAPHQL_URL || "https://job-board-backend-iota.vercel.app/graphql";
                    const response = await fetch(endpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `
                              mutation EmployerLogin($email: String!, $password: String!) {
                                employerLogin(contactEmail: $email, password: $password) {
                                  id
                                  contactEmail
                                  contactName
                                }
                              }
                            `,
                            variables: { email: credentials.email, password: credentials.password },
                        }),
                    });
                    const result = await response.json();
                    const employer = result?.data?.employerLogin;
                    if (!employer) {
                        return null;
                    }
                    return {
                        id: employer.id,
                        email: employer.contactEmail,
                        name: employer.contactName,
                        role: "employer"
                    }
                } else {
                    // Regular User Login Logic
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })

                    if (!user || !user.password) {
                        return null
                    }

                    const isPasswordValid = await compare(credentials.password, user.password)

                    if (!isPasswordValid) {
                        return null
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        role: "user"
                    }
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
}
