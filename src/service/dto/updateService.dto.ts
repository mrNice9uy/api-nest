import { ApiProperty } from '@nestjs/swagger';
import { IServiceUpdate } from '../service.types';

export class ServiceDtoUpdate implements IServiceUpdate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
