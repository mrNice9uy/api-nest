import { ApiProperty } from '@nestjs/swagger';
import { IServiceCreate } from '../service.types';

export class ServiceDtoCreate implements IServiceCreate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
