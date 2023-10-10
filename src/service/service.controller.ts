import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ServiceDtoCreate } from './dto/createService.dto';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceEntity } from './Entity/service.entity';
import { ServiceDtoUpdate } from './dto/updateService.dto';
import { IID } from 'src/common.types';

@ApiTags('Услуги')
@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @ApiResponse({ status: 200, type: ServiceEntity })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: ServiceDtoCreate) {
    return this.serviceService.create(dto);
  }

  @ApiResponse({ status: 200, type: [ServiceEntity] })
  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: ServiceEntity })
  @Get('/:id')
  async find(@Param() query: IID) {
    return this.serviceService.findById(query.id);
  }

  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: ServiceEntity })
  @Put('/:id')
  async update(@Param() query: IID, @Body() option: ServiceDtoUpdate) {
    return this.serviceService.updateById(query.id, option);
  }

  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: ServiceEntity })
  @Delete('/:id')
  async delete(@Param() query: IID) {
    return this.serviceService.deleteById(query.id);
  }
}
