# Job-Board

A full-stack job marketplace that helps **candidates discover and apply to jobs** while enabling **employers to manage hiring** through a dedicated dashboard.

## ✨ Project Overview

Job-Board is organized as a two-application monorepo:

- **Client (`/client`)**: Next.js app for public job browsing, authentication flows, and employer dashboard UI.
- **Server (`/server`)**: NestJS GraphQL API backed by Prisma + PostgreSQL for business logic and data access.

The platform is designed to cover the core hiring lifecycle:

1. Employers create and manage job posts.
2. Candidates search/filter listings and view detailed job information.
3. Candidates submit applications.
4. Employers review applicants and track hiring activity.

## 🚀 Core Features

### Candidate Experience
- Browse jobs with filtering support
- View job details and apply
- Authentication for candidate access

### Employer Experience
- Employer-specific authentication and protected routes
- Job creation and management workflows
- Applicant management and hiring visibility
- Company profile management
- Analytics-oriented dashboard modules

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Apollo Client (GraphQL)
- NextAuth
- React Hook Form + Zod

### Backend
- NestJS
- GraphQL (code-first)
- Prisma ORM
- PostgreSQL

## 📁 Repository Structure

```text
Job-Board/
├── client/   # Frontend (Next.js)
├── server/   # Backend (NestJS + GraphQL + Prisma)
└── README.md
```

## ⚙️ Local Setup

### 1) Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2) Configure environment variables

Create `.env` files in both workspaces:

- `client/.env`
- `server/.env`

Refer to each workspace README for required values:

- `client/README.md`
- `server/README.md`

### 3) Prepare database (server)

```bash
cd server
npx prisma generate
npx prisma migrate dev
# optional
npx prisma db seed
```

### 4) Run the project

```bash
# terminal 1
cd server
npm run start:dev

# terminal 2
cd client
npm run dev
```

- Frontend: `http://localhost:3000`
- GraphQL endpoint: `http://localhost:4000/graphql`

## 🗺️ Where to Explore Next

- Public pages and routes: `client/app/(public)/`
- Employer dashboard routes: `client/app/employer/`
- GraphQL modules: `server/src/job`, `server/src/employer`, `server/src/user`
- Database schema: `server/prisma/schema.prisma`
