import * as z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const employerSignUpSchema = z.object({
    // Employer Details
    contactName: z.string().min(2, "Contact name must be at least 2 characters"),
    contactDesignation: z.string().min(2, "Designation must be at least 2 characters"),
    contactEmail: z.string().email("Invalid email address"),
    contactMobile: z.string().min(1, "Field 'contactMobile' is required").min(10, "Mobile number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    // Company Details
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    tradeLicense: z.string().min(2, "Trade license is required"),
    yearOfEstablishment: z.string().min(4, "Year is required"),
    industryType: z.string().min(2, "Industry type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    address: z.string().min(5, "Address is required"),
    websiteUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type EmployerSignUpValues = z.infer<typeof employerSignUpSchema>;
