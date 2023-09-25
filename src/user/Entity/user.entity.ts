import { ApiProperty } from '@nestjs/swagger';
import { literal } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser, UserRole } from '../user.types';

@Table({ tableName: 'user' })
export class UserEntity extends Model<IUser> implements IUser {
  @ApiProperty()
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    defaultValue: literal('gen_random_uuid()'),
    primaryKey: true,
  })
  id: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  firstName: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  middleName: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  lastName: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  phone: string;

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  role: UserRole;
}
