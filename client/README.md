# Job Board Client

This is the frontend application for the Job Posting Website, built with **Next.js**, **TypeScript**, and **TailwindCSS**. It connects to the NestJS backend via GraphQL.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Data Fetching:** [Apollo Client](https://www.apollographql.com/docs/react/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Forms:** React Hook Form & Zod
- **Database Access:** Prisma (for Auth & Server Actions)

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- The **Server** application must be running (usually on port 4000)

### 2. Installation

```bash
cd client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `client` directory:

```env
# Database connection (Must match the server's DB)
DATABASE_URL="postgresql://user:password@localhost:5432/jobboard?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# GraphQL API URL
NEXT_PUBLIC_GRAPHQL_API_URL="http://localhost:4000/graphql"

# OAuth Providers (Optional)
GITHUB_CLIENT_ID="your-github-id"
GITHUB_CLIENT_SECRET="your-github-secret"
```

### 4. Prisma Client Generation

Since the database schema is managed in the `server` folder, the client needs to generate its own Prisma Client types based on that schema.

```bash
# Generate Prisma Client from the server's schema
npx prisma generate --schema=../server/prisma/schema.prisma
```

### 5. Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## ⚡️ Key Features

- **Public Job Board:** Browse and search for jobs without logging in.
- **Authentication:** 
  - **Candidates:** Sign up/Login to apply for jobs.
  - **Employers:** Dedicated login to manage companies and job postings.
- **Employer Dashboard:**
  - Create and manage Company Profiles.
  - Post new Jobs.
  - View Applicants.
- **Job Applications:** Candidates can apply to jobs directly.

## 📂 Project Structure

- `app/` - Next.js App Router pages and layouts.
- `components/` - Reusable UI components.
- `lib/` - Utilities, GraphQL queries, and service functions.
- `providers/` - React Context providers (Apollo, Session).
