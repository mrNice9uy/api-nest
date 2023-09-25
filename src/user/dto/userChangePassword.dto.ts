import { ApiProperty } from '@nestjs/swagger';
import { TChangePassword } from '../user.types';

export class UserDtoChangePassword implements TChangePassword {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
