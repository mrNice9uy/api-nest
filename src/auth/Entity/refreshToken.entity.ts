import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IRefreshToken {
  id: number;
  userId: string;
  refreshToken: string;
}

@Table({ tableName: 'refreshToken' })
export class RefreshTokenEntity
  extends Model<IRefreshToken>
  implements IRefreshToken
{
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  userId: string;

  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  refreshToken: string;
}
