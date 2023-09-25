import { ApiProperty } from '@nestjs/swagger';
import { IID } from 'src/common.types';

export class UserDtoDelete implements IID {
  @ApiProperty()
  id: string;
}
