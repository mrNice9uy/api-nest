import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { serviceProviders } from './service.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ServiceService, ...serviceProviders],
  controllers: [ServiceController],
  imports: [AuthModule],
})
export class ServiceModule {}
