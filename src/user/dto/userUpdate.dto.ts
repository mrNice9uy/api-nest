import { ApiProperty } from '@nestjs/swagger';
import { TChangeUser } from '../user.types';

export class UserDtoChange implements TChangeUser {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
}
