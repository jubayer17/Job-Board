import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const companies = [
  { name: 'Pathao', logo: 'P', location: 'Gulshan, Dhaka', website: 'https://pathao.com', description: 'Moving Bangladesh Forward. Pathao is the #1 Super App in Bangladesh.' },
  { name: 'bKash', logo: 'b', location: 'Banani, Dhaka', website: 'https://bkash.com', description: 'bKash is the fastest and safest medium of financial transaction.' },
  { name: 'ShopUp', logo: 'S', location: 'Mohakhali, Dhaka', website: 'https://shopup.com.bd', description: 'ShopUp is Bangladesh\'s leading full-stack B2B commerce platform.' },
  { name: 'Grameenphone', logo: 'G', location: 'Bashundhara, Dhaka', website: 'https://grameenphone.com', description: 'Grameenphone is the leading telecommunications service provider in Bangladesh.' },
  { name: 'Robi', logo: 'R', location: 'Gulshan, Dhaka', website: 'https://robi.com.bd', description: 'Robi Axiata Limited is the second largest mobile network operator in Bangladesh.' },
  { name: 'Banglalink', logo: 'B', location: 'Gulshan, Dhaka', website: 'https://banglalink.net', description: 'Banglalink is one of the leading digital communications service providers in Bangladesh.' },
  { name: 'Berger', logo: 'B', location: 'Uttara, Dhaka', website: 'https://bergerbd.com', description: 'Berger Paints Bangladesh Limited is the leading paint company in the country.' },
  { name: '10 Minute School', logo: '10', location: 'Mohakhali, Dhaka', website: 'https://10minuteschool.com', description: '10 Minute School is the largest online educational platform in Bangladesh.' },
  { name: 'Chaldal', logo: 'C', location: 'Mirpur, Dhaka', website: 'https://chaldal.com', description: 'Chaldal is the best online grocery shop in Bangladesh.' },
  { name: 'Brain Station 23', logo: 'B', location: 'Mohakhali, Dhaka', website: 'https://brainstation-23.com', description: 'Brain Station 23 is a global software development company.' },
  { name: 'Starkwood', logo: 'S', location: 'Gulshan, Dhaka', website: 'https://starkwood.com', description: 'Starkwood is a prominent real estate developer in Bangladesh.' },
  { name: 'Vivasoft', logo: 'V', location: 'Dhanmondi, Dhaka', website: 'https://vivasoftltd.com', description: 'Vivasoft is a software development company providing offshore development services.' },
  { name: 'Foodpanda', logo: 'F', location: 'Banani, Dhaka', website: 'https://foodpanda.com.bd', description: 'Order food online from the best restaurants in Bangladesh.' },
  { name: 'TigerIT', logo: 'T', location: 'Banani, Dhaka', website: 'https://tigerit.com', description: 'TigerIT is a leading software company specializing in biometrics and big data.' },
  { name: 'Daraz', logo: 'D', location: 'Banani, Dhaka', website: 'https://daraz.com.bd', description: 'Daraz is the leading online marketplace in South Asia.' },
  { name: 'Selise', logo: 'S', location: 'Dhanmondi, Dhaka', website: 'https://selise.ch', description: 'SELISE is a Swiss software development firm with a major delivery center in Dhaka.' }
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

const employers = [
  { name: 'Rahat Ahmed', email: 'rahat.ahmed@example.com', designation: 'Head of HR' },
  { name: 'Farhana Rahman', email: 'farhana.rahman@example.com', designation: 'Talent Acquisition Lead' },
  { name: 'Tanvir Islam', email: 'tanvir.islam@example.com', designation: 'Recruitment Manager' },
  { name: 'Nabila Huda', email: 'nabila.huda@example.com', designation: 'HR Business Partner' }
];

async function main() {
  console.log('Start seeding ...')

  // Password for all employers
  const hashedPassword = await bcrypt.hash('password123', 10);

  const createdEmployers = [];

  // Create Employers
  for (const emp of employers) {
    const employer = await prisma.employer.upsert({
      where: { contactEmail: emp.email },
      update: {},
      create: {
        contactName: emp.name,
        contactDesignation: emp.designation,
        contactEmail: emp.email,
        contactMobile: '01700000000',
        password: hashedPassword,
      },
    });
    createdEmployers.push(employer);
    console.log(`Created/Found employer: ${employer.contactName}`);
  }

  // Create Companies and assign to random employers
  const createdCompanies = [];
  for (const companyInfo of companies) {
    const randomEmployer = createdEmployers[Math.floor(Math.random() * createdEmployers.length)];
    
    let company = await prisma.company.findFirst({
        where: { companyName: companyInfo.name, employerId: randomEmployer.id }
    });
    
    if (!company) {
        company = await prisma.company.create({
            data: {
                companyName: companyInfo.name,
                employerId: randomEmployer.id,
                address: companyInfo.location,
                websiteUrl: companyInfo.website,
                description: companyInfo.description,
                industryType: 'Technology',
                tradeLicense: `TRD-${Math.floor(Math.random() * 100000)}`,
                yearOfEstablishment: `${2000 + Math.floor(Math.random() * 23)}`
            }
        });
    }
    createdCompanies.push({ ...company, logo: companyInfo.logo });
    console.log(`Created/Found company: ${company.companyName} for employer ${randomEmployer.contactName}`);
  }

  // Generate 30 jobs
  for (let i = 0; i < 30; i++) {
    const companyData = createdCompanies[Math.floor(Math.random() * createdCompanies.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const postedAt = new Date();
    postedAt.setDate(postedAt.getDate() - daysAgo);

    const job = await prisma.job.create({
      data: {
        title: role.title,
        location: companyData.address || 'Dhaka',
        type: type,
        description: `We are looking for a talented ${role.title} to join our team at ${companyData.companyName}.
        
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
        logo: companyData.logo,
        tags: role.tags,
        salaryMin: role.min,
        salaryMax: role.max,
        postedAt: postedAt,
        employerId: companyData.employerId,
        companyId: companyData.id,
        company: companyData.companyName,
        applyLink: companyData.websiteUrl ? `${companyData.websiteUrl}/careers` : '',
        status: 'active',
      },
    })
    console.log(`Created job: ${job.title} at ${job.company}`)
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
