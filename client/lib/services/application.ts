import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Service to handle Application-related data operations.
 */

export const getUserApplications = cache(async (userId: string) => {
    try {
        const applications = await prisma.application.findMany({
            where: {
                userId: userId,
            },
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        company: true,
                        location: true,
                        type: true,
                    }
                }
            },
            orderBy: {
                appliedAt: 'desc'
            }
        });
        return applications;
    } catch (error) {
        console.error("Error fetching user applications:", error);
        return [];
    }
});
