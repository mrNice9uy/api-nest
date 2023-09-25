import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { jwtProviders } from './auth.provider';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Module({
  exports: [JwtService],
  controllers: [AuthController],
  imports: [forwardRef(()=>UserModule)],
  providers: [JwtService, AuthService, ...jwtProviders],
})
export class AuthModule {}
