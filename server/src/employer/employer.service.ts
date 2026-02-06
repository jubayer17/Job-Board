import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployerInput } from './dto/create-employer.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployerService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployerInput: CreateEmployerInput) {
    const {
      contactEmail,
      password,
      companyName,
      tradeLicense,
      yearOfEstablishment,
      industryType,
      description,
      address,
      websiteUrl,
      ...employerData
    } = createEmployerInput;

    const existingEmployer = await this.prisma.employer.findUnique({
      where: { contactEmail },
    });

    if (existingEmployer) {
      throw new ConflictException('Employer with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.employer.create({
      data: {
        ...employerData,
        contactEmail,
        password: hashedPassword,
        companies: {
          create: {
            companyName,
            tradeLicense,
            yearOfEstablishment,
            industryType,
            description,
            address,
            websiteUrl,
          }
        }
      },
    });
  }

  async validateLogin(contactEmail: string, password: string) {
    const employer = await this.prisma.employer.findUnique({
      where: { contactEmail },
    });
    if (!employer || !employer.password) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, employer.password);
    if (!isPasswordValid) {
      return null;
    }
    return employer;
  }

  async findOne(id: string) {
    return this.prisma.employer.findUnique({
      where: { id },
      include: { companies: true },
    });
  }
}
