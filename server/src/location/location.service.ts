import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: CreateLocationDto) {
    return this.prisma.location.create({
      data,
    });
  }

  async updateStatus(id: string, isActive: boolean) {
    return this.prisma.location.update({
      where: { id },
      data: { isActive },
    });
  }
}
