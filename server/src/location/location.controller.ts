import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@ApiTags('locations')
@Controller('api/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiOperation({ summary: 'List all active locations' })
  @ApiResponse({ status: 200, description: 'Array of location objects' })
  findAll() {
    return this.locationService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Toggle active status of a location' })
  @ApiParam({ name: 'id', description: 'Location UUID' })
  @ApiBody({ schema: { type: 'object', properties: { isActive: { type: 'boolean' } }, required: ['isActive'] } })
  @ApiResponse({ status: 200, description: 'Location status updated' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  updateStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.locationService.updateStatus(id, isActive);
  }
}
