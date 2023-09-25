import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { DatabaseModule } from './dataBase/dataBase.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ServiceModule],
  providers: [],
})
export class AppModule {}
