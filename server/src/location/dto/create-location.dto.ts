import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Dhaka, Bangladesh', description: 'Display name of the location' })
  name: string;

  @ApiProperty({ example: 'Dhaka', required: false })
  city?: string;

  @ApiProperty({ example: 'Dhaka Division', required: false })
  state?: string;

  @ApiProperty({ example: 'Bangladesh', required: false })
  country?: string;

  @ApiProperty({ example: true, default: true, required: false })
  isActive?: boolean;
}
