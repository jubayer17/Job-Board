import * as z from "zod";

export const createJobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    companyId: z.string().min(1, "Please select a company"),
    location: z.string().min(2, "Location is required"),
    type: z.string().min(2, "Job type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salary: z.string().optional(),
    tags: z.string().optional(),

    // New BD specific fields
    vacancies: z.any().transform((val) => Number(val) || 1),
    deadline: z.string().optional(), // Date input returns string "YYYY-MM-DD"
    experience: z.string().optional(),
    education: z.string().optional(),
    workplace: z.string().optional(),
    jobContext: z.string().optional(),
    gender: z.string().optional(),

    // New Fields
    applyLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    logo: z.string().optional(),
});

export type CreateJobValues = z.infer<typeof createJobSchema>;
