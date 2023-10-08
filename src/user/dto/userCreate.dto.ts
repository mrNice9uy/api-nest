import { ApiProperty } from '@nestjs/swagger';
import { IUser, IUserCreate, UserRole } from '../user.types';

export class UserDtoCreate implements IUserCreate {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UserDtoInfo implements IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  isActive = true;
  role: UserRole;

  constructor(dto: IUserCreate) {
    this.email = dto.email;
    this.password = dto.password;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.middleName = dto.middleName;
    this.phone = dto.phone ?? null;
    this.role = 'CLIENT';
  }
}
