import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

const TextError = 'Пользователь не авторизован';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const cookieAccess = request.cookies['accessToken'];
      if (!cookieAccess) {
        throw new ForbiddenException(TextError);
      }

      const payload = this.jwtService.verifyAccess(cookieAccess);
      request.user = payload;

      return true;
    } catch (error) {
      throw new ForbiddenException(TextError);
    }
  }
}
