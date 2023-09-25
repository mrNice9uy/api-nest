import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ServiceEntity } from './Entity/service.entity';
import { ServiceDtoCreate } from './dto/createService.dto';
import { ServiceDtoUpdate } from './dto/updateService.dto';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: typeof ServiceEntity,
  ) {}

  async create(dto: ServiceDtoCreate) {
    const service = await this.serviceRepository.create(dto);
    return service;
  }

  async findAll() {
    const services = await this.serviceRepository.findAll();
    return services;
  }

  async findById(id: string) {
    const service = await this.serviceRepository.findByPk(id);
    return service;
  }

  async updateById(id: string, option: ServiceDtoUpdate) {
    const service = await this.serviceRepository.findByPk(id);

    const updatedService = await service.update(option);

    return updatedService;
  }

  async deleteById(id: string) {
    const service = await this.serviceRepository.findByPk(id);

    if (service) {
      await service.destroy();
      return true;
    }

    throw new HttpException('Ошибка удаления', HttpStatus.BAD_REQUEST);
  }
}
