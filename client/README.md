# Job Posting Website - Client

A modern job posting platform frontend built with Next.js 14 (App Router), tailored for the Bangladeshi market context.

## � Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State/Data**: [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (v4)
- **Forms**: React Hook Form + Zod

## ✨ Features

- **Candidate Portal**:
  - Browse and filter jobs (BD-vibed data).
  - Apply for jobs.
  - User authentication (Email/Password & GitHub).
- **Employer Dashboard**:
  - Post and manage job listings.
  - Manage company profile (Logo, Description, Website).
  - View applications.
- **Authentication**:
  - Separate login flows for Candidates and Employers.
  - **Note**: Uses JWT strategy for sessions (stored in cookies), not database sessions.

## 🛠️ Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root of the `client` directory:

   ```env
   DATABASE_URL="postgresql://..." # Same as server
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GITHUB_CLIENT_ID="your-github-id"
   GITHUB_CLIENT_SECRET="your-github-secret"
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts.
  - `/employer`: Employer-specific routes (Dashboard, Company Page).
  - `/jobs`: Job listing and details pages.
- `/components`: Reusable UI components (shadcn/ui).
- `/lib`: Utility functions, Apollo Client setup, and Auth configuration.

## � Authentication Note

This project uses `CredentialsProvider` for email/password login, which requires the **JWT strategy**.

- Sessions are **not** stored in the database `Session` table.
- Sessions are stored in encrypted browser cookies.
- This is the expected behavior for this configuration.
