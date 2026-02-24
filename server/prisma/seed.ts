import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const bangladeshLocations = [
  // Dhaka Division
  { division: 'Dhaka', district: 'Dhaka', area: 'Gulshan' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Banani' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Dhanmondi' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Mirpur' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Uttara' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Mohakhali' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Farmgate' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Motijheel' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Badda' },
  { division: 'Dhaka', district: 'Dhaka', area: 'Khilkhet' },
  { division: 'Dhaka', district: 'Gazipur', area: 'Tongi' },
  { division: 'Dhaka', district: 'Gazipur', area: 'Gazipur Sadar' },
  { division: 'Dhaka', district: 'Gazipur', area: 'Kaliakair' },
  { division: 'Dhaka', district: 'Narayanganj', area: 'Narayanganj Sadar' },
  { division: 'Dhaka', district: 'Narayanganj', area: 'Sonargaon' },
  { division: 'Dhaka', district: 'Narayanganj', area: 'Rupganj' },
  { division: 'Dhaka', district: 'Narsingdi', area: 'Narsingdi Sadar' },
  { division: 'Dhaka', district: 'Tangail', area: 'Tangail Sadar' },
  { division: 'Dhaka', district: 'Faridpur', area: 'Faridpur Sadar' },

  // Chattogram Division
  { division: 'Chattogram', district: 'Chattogram', area: 'Agrabad' },
  { division: 'Chattogram', district: 'Chattogram', area: 'GEC Circle' },
  { division: 'Chattogram', district: 'Chattogram', area: 'Nasirabad' },
  { division: 'Chattogram', district: 'Chattogram', area: 'Halishahar' },
  { division: 'Chattogram', district: 'Chattogram', area: 'Chawkbazar' },
  { division: 'Chattogram', district: 'Cox\'s Bazar', area: 'Cox\'s Bazar Sadar' },
  { division: 'Chattogram', district: 'Cox\'s Bazar', area: 'Teknaf' },
  { division: 'Chattogram', district: 'Cumilla', area: 'Cumilla Sadar' },
  { division: 'Chattogram', district: 'Cumilla', area: 'Kandirpar' },
  { division: 'Chattogram', district: 'Feni', area: 'Feni Sadar' },
  { division: 'Chattogram', district: 'Noakhali', area: 'Noakhali Sadar' },
  { division: 'Chattogram', district: 'Brahmanbaria', area: 'Brahmanbaria Sadar' },

  // Sylhet Division
  { division: 'Sylhet', district: 'Sylhet', area: 'Zindabazar' },
  { division: 'Sylhet', district: 'Sylhet', area: 'Amberkhana' },
  { division: 'Sylhet', district: 'Sylhet', area: 'Shahjalal Uposohor' },
  { division: 'Sylhet', district: 'Moulvibazar', area: 'Srimangal' },
  { division: 'Sylhet', district: 'Moulvibazar', area: 'Moulvibazar Sadar' },
  { division: 'Sylhet', district: 'Habiganj', area: 'Habiganj Sadar' },
  { division: 'Sylhet', district: 'Sunamganj', area: 'Sunamganj Sadar' },

  // Rajshahi Division
  { division: 'Rajshahi', district: 'Rajshahi', area: 'Shaheb Bazar' },
  { division: 'Rajshahi', district: 'Rajshahi', area: 'Motihar' },
  { division: 'Rajshahi', district: 'Bogura', area: 'Bogura Sadar' },
  { division: 'Rajshahi', district: 'Bogura', area: 'Sherpur' },
  { division: 'Rajshahi', district: 'Pabna', area: 'Pabna Sadar' },
  { division: 'Rajshahi', district: 'Pabna', area: 'Ishwardi' },
  { division: 'Rajshahi', district: 'Sirajganj', area: 'Sirajganj Sadar' },

  // Khulna Division
  { division: 'Khulna', district: 'Khulna', area: 'Shibbari' },
  { division: 'Khulna', district: 'Khulna', area: 'Sonadanga' },
  { division: 'Khulna', district: 'Khulna', area: 'Khalishpur' },
  { division: 'Khulna', district: 'Jashore', area: 'Jashore Sadar' },
  { division: 'Khulna', district: 'Kushtia', area: 'Kushtia Sadar' },
  { division: 'Khulna', district: 'Satkhira', area: 'Satkhira Sadar' },

  // Barishal Division
  { division: 'Barishal', district: 'Barishal', area: 'Sadar Road' },
  { division: 'Barishal', district: 'Barishal', area: 'Rupatoli' },
  { division: 'Barishal', district: 'Bhola', area: 'Bhola Sadar' },
  { division: 'Barishal', district: 'Patuakhali', area: 'Patuakhali Sadar' },

  // Rangpur Division
  { division: 'Rangpur', district: 'Rangpur', area: 'Jahaj Company Mor' },
  { division: 'Rangpur', district: 'Rangpur', area: 'Dhap' },
  { division: 'Rangpur', district: 'Dinajpur', area: 'Dinajpur Sadar' },
  { division: 'Rangpur', district: 'Saidpur', area: 'Saidpur' },

  // Mymensingh Division
  { division: 'Mymensingh', district: 'Mymensingh', area: 'Ganginarpar' },
  { division: 'Mymensingh', district: 'Mymensingh', area: 'Charpara' },
  { division: 'Mymensingh', district: 'Jamalpur', area: 'Jamalpur Sadar' },
];

async function main() {
  console.log('Seeding locations...');

  for (const loc of bangladeshLocations) {
    // Check if exists based on name (Area) + city (District) to avoid duplicates
    const exists = await prisma.location.findFirst({
      where: {
        name: loc.area,
        city: loc.district,
        state: loc.division
      }
    });

    if (!exists) {
      await prisma.location.create({
        data: {
          name: loc.area,       // Area -> name
          city: loc.district,   // District -> city
          state: loc.division,  // Division -> state
          country: 'Bangladesh',
          isActive: true
        }
      });
      console.log(`Created: ${loc.area}, ${loc.district}, ${loc.division}`);
    } else {
      console.log(`Skipped (Exists): ${loc.area}, ${loc.district}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
