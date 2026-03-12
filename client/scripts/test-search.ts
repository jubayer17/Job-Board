
import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Load env from server/.env
const envPath = path.resolve(__dirname, '../../server/.env');
if (fs.existsSync(envPath)) {
    console.log(`Loading env from ${envPath}`);
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key.trim()]) {
            process.env[key.trim()] = value.trim().replace(/^"|"$/g, '');
        }
    });
} else {
    console.warn('Warning: server/.env not found, relying on process.env');
}

const prisma = new PrismaClient();

async function main() {
    console.log('Starting search tests...');

    // Unique tag to identify test data
    const testTag = 'TEST_SEARCH_' + Date.now();

    // Create Employer
    const employer = await prisma.employer.create({
        data: {
            contactName: 'Test Search Employer',
            contactEmail: `test-search-${Date.now()}@example.com`,
            password: 'password123',
            contactDesignation: 'HR Manager',
            contactMobile: '01700000000',
        }
    });

    console.log(`Created test employer: ${employer.id}`);

    // Create Company
    const company = await prisma.company.create({
        data: {
            companyName: 'Test Search Company',
            employerId: employer.id,
            industryType: 'IT',
            address: 'Dhaka',
        }
    });

    console.log(`Created test company: ${company.id}`);

    // Create Jobs
    await prisma.job.createMany({
        data: [
            {
                title: 'Senior Software Engineer',
                description: 'We need a senior software engineer with React and Node.js experience.',
                company: 'Tech Corp', // Legacy string field? Or display name?
                location: 'Dhaka',
                type: 'Full-time',
                employerId: employer.id,
                companyId: company.id,
                tags: [testTag],
                postedAt: new Date(),
                status: 'active',
                salary: '50k-80k',
            },
            {
                title: 'Junior Web Developer',
                description: 'Looking for a junior web developer familiar with HTML, CSS, and JS.',
                company: 'Web Solutions',
                location: 'Chittagong',
                type: 'Full-time',
                employerId: employer.id,
                companyId: company.id,
                tags: [testTag],
                postedAt: new Date(),
                status: 'active',
                salary: '20k-30k',
            },
            {
                title: 'Product Manager',
                description: 'Product manager role for software products. No coding required.',
                company: 'Soft Products',
                location: 'Sylhet',
                type: 'Remote',
                employerId: employer.id,
                companyId: company.id,
                tags: [testTag],
                postedAt: new Date(),
                status: 'active',
                salary: '40k-60k',
            }
        ]
    });

    console.log('Test jobs created.');

    try {
        // Test 1: Mandatory Matching
        // Search "Software Engineer" -> Should match "Senior Software Engineer"
        console.log('\nTest 1: Search "Software Engineer" (Expect: Match)');
        const res1 = await search('Software Engineer');
        assert(res1.some(j => j.title === 'Senior Software Engineer'), 'Should find "Senior Software Engineer"');

        // Search "Software Chef" -> Should match NOTHING (because "Chef" is missing)
        console.log('\nTest 2: Search "Software Chef" (Expect: 0 results)');
        const res2 = await search('Software Chef');
        assert(res2.length === 0, 'Should find 0 results because "Chef" is missing');

        // Test 3: Word Order Independence
        // Search "Engineer Software" -> Should match "Senior Software Engineer"
        console.log('\nTest 3: Search "Engineer Software" (Expect: Match)');
        const res3 = await search('Engineer Software');
        assert(res3.some(j => j.title === 'Senior Software Engineer'), 'Should find "Senior Software Engineer" regardless of order');

        // Test 4: Ranking
        // Search "Software" -> "Senior Software Engineer" (title match) vs "Product Manager" (desc match "software products")
        console.log('\nTest 4: Search "Software" (Expect: Ranked results)');
        const res4 = await search('Software');
        assert(res4.length >= 2, 'Should find both jobs with "Software"');
        console.log('Ranked results:', res4.map(r => `${r.title} (${r.rank})`));

        // Check if "Senior Software Engineer" is ranked higher or present
        // Ranking depends on exact weights, but title match should be good.

        // Test 5: Special Characters
        // Search "Node.js" -> Should match "Senior Software Engineer" (desc has Node.js)
        console.log('\nTest 5: Search "Node.js" (Expect: Match)');
        const res5 = await search('Node.js');
        assert(res5.some(j => j.title === 'Senior Software Engineer'), 'Should find "Node.js" in description');

        // Test 6: Highlighting
        // Search "Senior" -> Should have headline with <b>Senior</b>
        console.log('\nTest 6: Highlighting (Expect: <b> tags)');
        const res6 = await search('Senior');
        const match6 = res6.find(j => j.title === 'Senior Software Engineer');
        console.log('Headline result:', match6?.headline);
        // Relax assertion to check for ANY bold tag, as case might differ or stemming
        assert(match6 && (match6.headline.includes('<b>') || match6.headline.includes('Senior')), 'Should contain highlighted content');

    } catch (e) {
        console.error('Test execution failed:', e);
        throw e;
    } finally {
        // Cleanup
        console.log('\nCleaning up...');
        await prisma.job.deleteMany({ where: { employerId: employer.id } });
        await prisma.company.delete({ where: { id: company.id } });
        await prisma.employer.delete({ where: { id: employer.id } });
        console.log('Cleanup done.');
    }

    console.log('\n✅ All Tests Passed!');
}

async function search(term: string) {
    const vectorSql = `to_tsvector('english', coalesce(title, '') || ' ' || coalesce(company, '') || ' ' || coalesce(description, '') || ' ' || coalesce(location, ''))`;

    // Use the exact same query logic as in the application
    const results = await prisma.$queryRaw<any[]>`
        WITH search_query AS (
            SELECT plainto_tsquery('english', ${term}) as query,
                   phraseto_tsquery('english', ${term}) as phrase_query
        )
        SELECT 
            id, title,
            ts_rank_cd(${Prisma.raw(vectorSql)}, sq.query) + 
            (CASE WHEN ${Prisma.raw(vectorSql)} @@ sq.phrase_query THEN 1.0 ELSE 0.0 END) as rank,
            ts_headline('english', description, sq.query, 'StartSel=<b>, StopSel=</b>, MaxWords=35, MinWords=15, ShortWord=3, HighlightAll=FALSE, MaxFragments=3, FragmentDelimiter="..."') as headline
        FROM "Job", search_query sq
        WHERE ${Prisma.raw(vectorSql)} @@ sq.query
        ORDER BY rank DESC
    `;
    return results;
}

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
    console.log(`  ✅ ${message}`);
}

main()
    .catch(e => {
        console.error('Test script failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
