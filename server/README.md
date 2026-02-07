# Job Posting Website - Server

The backend API for the job posting platform, built with NestJS, GraphQL, and Prisma.

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **API**: GraphQL (Code First)
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT & NextAuth Integration

## ✨ Features

- **GraphQL API**: Comprehensive API for Jobs, Employers, Companies, and Users.
- **Database Management**: Prisma schema managing complex relations (Job -> Employer -> Company).
- **Seeding**: Robust seed script to populate the database with realistic Bangladeshi context data.
- **Authentication**: Handles Employer login mutations and User queries.

## 🛠️ Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root of the `server` directory:

   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
   ```

3. **Database Setup**

   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Push Schema to Database
   npx prisma db push
   # OR
   npx prisma migrate dev
   ```

4. **🌱 Seed Database (Important)**
   Populate the database with 30+ jobs, employers, and companies (BD context):

   ```bash
   npx prisma db seed
   ```

5. **Run Development Server**
   ```bash
   npm run start:dev
   ```
   The GraphQL Playground will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql).

## 📂 Project Structure

- `/src`: NestJS source code.
  - `/job`: Job module (Service, Resolver).
  - `/employer`: Employer module.
  - `/company`: Company module.
  - `/user`: User module.
- `/prisma`: Database schema and seed script.
  - `schema.prisma`: The single source of truth for the database model.
  - `seed.ts`: Script to generate dummy data.

## 📝 Seed Data

The `seed.ts` script automatically creates:

- **Employers**: Real-world contact personas (e.g., HR Heads from top BD companies).
- **Companies**: Leading BD companies (Pathao, bKash, Grameenphone, etc.) with logos and descriptions.
- **Jobs**: 30+ job postings linked to these companies with realistic descriptions and salaries.
- **Users & Applications**: Dummy candidates and job applications.
