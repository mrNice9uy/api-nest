import { Sequelize } from 'sequelize-typescript';
import { RefreshTokenEntity } from '../auth/Entity/refreshToken.entity';
import { UserEntity } from '../user/Entity/user.entity';
import { ServiceEntity } from '../service/Entity/service.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'auth',
      });
      sequelize.addModels([UserEntity, RefreshTokenEntity, ServiceEntity]);
      await sequelize.sync({ force: false });
      return sequelize;
    },
  },
];
