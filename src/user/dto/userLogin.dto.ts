import { ApiProperty } from '@nestjs/swagger';
import { IUserAuth } from '../user.types';

export class UserDtoLogin implements IUserAuth {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
