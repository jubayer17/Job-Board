import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { PrismaService } from '../prisma.service';

describe('LocationService', () => {
  let service: LocationService;
  let prisma: {
    location: {
      findMany: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: PrismaService,
          useValue: {
            location: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    prisma = module.get(PrismaService);
  });

  it('uses isActive filter when fetching locations', async () => {
    prisma.location.findMany.mockResolvedValue([]);

    await service.findAll();

    expect(prisma.location.findMany).toHaveBeenCalledWith({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  });
});
