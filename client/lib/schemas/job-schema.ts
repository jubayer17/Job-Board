import * as z from "zod";

export const createJobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    company: z.string().min(2, "Company name is required"),
    location: z.string().min(2, "Location is required"),
    type: z.string().min(2, "Job type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salary: z.string().optional(),
    tags: z.string().optional(),
});

export type CreateJobValues = z.infer<typeof createJobSchema>;
