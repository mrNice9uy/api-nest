import { ApiProperty } from '@nestjs/swagger';
import { literal } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IService } from '../service.types';

@Table({ tableName: 'service' })
export class ServiceEntity extends Model<IService> implements IService {
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
  name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  price: number;
}
