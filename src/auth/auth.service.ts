import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt/jwt.service';
import { UserDtoCreate } from '../user/dto/userCreate.dto';
import { UserDtoLogin } from '../user/dto/userLogin.dto';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { normalizeUser } from '../user/utils/normalizeUser';
import { IUserDTO } from 'src/user/user.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(dto: UserDtoLogin) {
    const user = await this.userService.getUserByLogin(dto);

    if (user instanceof HttpException) {
      return new UnauthorizedException(user.message);
    }

    const tokens = await this.jwtService.generateTokens(user as IUserDTO);

    await this.jwtService.updateRefresh(user.id, tokens.refreshToken);

    return tokens;
  }

  async register(dto: UserDtoCreate) {
    const user = await this.userService.addUser(dto);

    if (user instanceof HttpException) {
      return user;
    }
    const tokens = await this.jwtService.generateTokens(user as IUserDTO);

    await this.jwtService.updateRefresh(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    const jwtPayload = await this.jwtService.verifyRefresh(refreshToken);

    if (jwtPayload instanceof UnauthorizedException) {
      return new UnauthorizedException('Ошибка аутентификация');
    }

    if (typeof jwtPayload === 'object' && 'email' in jwtPayload) {
      const user = await this.userService.getUserByEmail(jwtPayload?.email);
      if (!user) {
        return new UnauthorizedException('Ошибка аутентификация');
      }
      const tokens = await this.jwtService.generateTokens(normalizeUser(user));
      await this.jwtService.updateRefresh(user.id, tokens.refreshToken);
      return tokens;
    }

    return new UnauthorizedException('Ошибка аутентификация');
  }

  async logout(userId: string) {
    return this.jwtService.deleteRefreshByUser(userId);
  }
}
