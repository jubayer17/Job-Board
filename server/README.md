# Job Board Server

This is the backend API for the Job Posting Website, built with **NestJS**, **GraphQL**, and **Prisma**.

## 🛠 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **API:** GraphQL (Code-first approach)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Language:** TypeScript

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running (or use a cloud provider like Neon/Supabase)

### 2. Installation

```bash
cd server
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/jobboard?schema=public"

# API Port
PORT=4000
```

### 4. Database Setup

Run the migrations to set up your database schema:

```bash
# Run migrations
npx prisma migrate dev

# Seed the database with initial data (Employers, Companies, Jobs)
npx prisma db seed
```

### 5. Running the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The GraphQL Playground will be available at `http://localhost:4000/graphql`.

## 📂 Project Structure

- `src/` - NestJS modules and business logic
- `prisma/` - Database schema, migrations, and seed scripts
- `test/` - E2E tests

## 📜 Available Scripts

- `npm run start:dev` - Starts the development server with hot-reload.
- `npx prisma generate` - Generates the Prisma Client.
- `npx prisma migrate dev` - Applies schema changes to the database.
- `npx prisma db seed` - Populates the database with dummy data.
