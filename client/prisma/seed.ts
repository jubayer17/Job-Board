import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const jobsData = [
  // ... (will generate 30 jobs in the loop)
];

const companies = [
  { name: 'Pathao', logo: 'P', location: 'Dhaka, Bangladesh' },
  { name: 'bKash', logo: 'b', location: 'Dhaka, Bangladesh' },
  { name: 'ShopUp', logo: 'S', location: 'Remote' },
  { name: 'Grameenphone', logo: 'G', location: 'Gulshan, Dhaka' },
  { name: 'Robi', logo: 'R', location: 'Gulshan, Dhaka' },
  { name: 'Banglalink', logo: 'B', location: 'Dhaka, Bangladesh' },
  { name: 'Berger', logo: 'B', location: 'Dhaka, Bangladesh' },
  { name: '10 Minute School', logo: '10', location: 'Remote' },
  { name: 'Chaldal', logo: 'C', location: 'Dhaka, Bangladesh' },
  { name: 'Brain Station 23', logo: 'B', location: 'Dhaka, Bangladesh' },
  { name: 'Starkwood', logo: 'S', location: 'Gulshan, Dhaka' },
  { name: 'Vivasoft', logo: 'V', location: 'Remote' },
  { name: 'Foodpanda', logo: 'F', location: 'Banani, Dhaka' },
  { name: 'TigerIT', logo: 'T', location: 'Dhaka, Bangladesh' },
  { name: 'Daraz', logo: 'D', location: 'Banani, Dhaka' },
  { name: 'Selise', logo: 'S', location: 'Remote' }
];

const roles = [
  { title: 'Senior Frontend Developer', tags: ['React', 'Next.js', 'TypeScript'], salary: '120k - 180k BDT', min: 120000, max: 180000 },
  { title: 'Product Designer (UI/UX)', tags: ['Figma', 'Prototyping', 'User Research'], salary: '80k - 120k BDT', min: 80000, max: 120000 },
  { title: 'Backend Engineer (Go)', tags: ['Go', 'Microservices', 'AWS'], salary: '150k - 200k BDT', min: 150000, max: 200000 },
  { title: 'Marketing Manager', tags: ['Marketing', 'Strategy', 'B2B'], salary: 'Negotiable', min: 0, max: 0 },
  { title: 'Data Scientist', tags: ['Python', 'ML', 'Data Analysis'], salary: '100k - 150k BDT', min: 100000, max: 150000 },
  { title: 'DevOps Engineer', tags: ['Docker', 'Kubernetes', 'CI/CD'], salary: '140k - 200k BDT', min: 140000, max: 200000 },
  { title: 'HR Specialist', tags: ['Recruitment', 'Employee Relations'], salary: '50k - 80k BDT', min: 50000, max: 80000 },
  { title: 'Content Writer', tags: ['Content Marketing', 'SEO', 'Copywriting'], salary: '20k - 40k BDT', min: 20000, max: 40000 },
  { title: 'Sales Executive', tags: ['Sales', 'Negotiation', 'CRM'], salary: '30k - 50k BDT', min: 30000, max: 50000 },
  { title: 'Lead Software Engineer', tags: ['Java', 'Spring Boot', 'Microservices'], salary: '250k - 350k BDT', min: 250000, max: 350000 },
  { title: 'CTO', tags: ['Leadership', 'Architecture', 'Strategy'], salary: '400k - 600k BDT', min: 400000, max: 600000 },
  { title: 'Principal Product Manager', tags: ['Product Strategy', 'Agile', 'Data Driven'], salary: '300k - 450k BDT', min: 300000, max: 450000 }
];

const types = ['Full-time', 'Part-time', 'Contract', 'Remote'];

async function main() {
  console.log('Start seeding ...')

  // Create a dummy user to post jobs
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      image: 'https://i.pravatar.cc/150?u=demo@example.com',
    },
  })

  console.log(`Created/Found user: ${user.name} (${user.id})`)

  // Generate 30 jobs
  for (let i = 0; i < 30; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const postedAt = new Date();
    postedAt.setDate(postedAt.getDate() - daysAgo);

    const job = await prisma.job.create({
      data: {
        title: role.title,
        company: company.name,
        location: company.location,
        type: type,
        description: `We are looking for a talented ${role.title} to join our team at ${company.name}.
        
Key Responsibilities:
- Work with cross-functional teams to design, build, and roll out products that deliver the company's vision and strategy.
- Develop and maintain clean, efficient code.
- Troubleshoot and debug applications.
- Collaborate with other developers to improve code quality.

Requirements:
- Proven experience as a ${role.title} or similar role.
- Strong knowledge of ${role.tags.join(', ')}.
- Excellent communication and teamwork skills.
- Degree in Computer Science, Engineering or a related field is a plus.

Benefits:
- Competitive salary and performance bonuses.
- Health insurance and wellness programs.
- Flexible working hours and remote work options.
- Professional development opportunities.`,
        salary: role.salary,
        logo: company.logo,
        tags: role.tags,
        salaryMin: role.min,
        salaryMax: role.max,
        postedAt: postedAt,
        postedById: user.id,
        applyLink: `https://${company.name.toLowerCase().replace(/\s/g, '')}.com/careers`,
      },
    })
    console.log(`Created job with id: ${job.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
