import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenEntity } from '../Entity/refreshToken.entity';

import { sign, verify } from 'jsonwebtoken';
import { IUserDTO } from 'src/user/user.types';

@Injectable()
export class JwtService {
  constructor(
    @Inject('JWT_REPOSITORY') private jwtRepository: typeof RefreshTokenEntity,
  ) {}

  generateAccessToken(payload: IUserDTO) {
    const accessToken = sign(payload, 'secretBellistAccess', {
      expiresIn: '1m',
    });
    return accessToken;
  }

  generateRefreshToken(payload: IUserDTO) {
    const refreshToken = sign(payload, 'secretBellistRefresh', {
      expiresIn: '2m',
    });
    return refreshToken;
  }

  async generateTokens(payload: IUserDTO) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefresh(userId: string, refreshToken: string) {
    const userToken = await this.jwtRepository.findOne({ where: { userId } });

    if (userToken) {
      const updateToken = await userToken.update({ refreshToken });
      return updateToken.refreshToken;
    }

    const newRefreshToken = await this.jwtRepository.create({
      userId,
      refreshToken,
    });

    return newRefreshToken.refreshToken;
  }

  async deleteRefresh(refreshToken: string) {
    const userToken = await this.jwtRepository.findOne({
      where: { refreshToken },
    });

    if (!userToken) {
      return new UnauthorizedException('Ошибка аутентификация');
    }
    await userToken.destroy();

    return true;
  }

  async deleteRefreshByUser(userId: string) {
    const userToken = await this.jwtRepository.findOne({ where: { userId } });

    if (!userToken) {
      return new UnauthorizedException('Ошибка аутентификация');
    }
    await userToken.destroy();

    return true;
  }

  verifyAccess(token: string) {
    return verify(token, 'secretBellistAccess', { maxAge: 60 * 1000 });
  }

  async verifyRefresh(refreshToken: string) {
    const userToken = await this.jwtRepository.findOne({
      where: { refreshToken },
    });

    if (!userToken) {
      return new UnauthorizedException('Ошибка аутентификация');
    }

    try {
      return verify(refreshToken, 'secretBellistRefresh', {
        maxAge: 2 * 60 * 1000,
      });
    } catch (error) {
      return new UnauthorizedException('Ошибка аутентификация');
    }
  }
}
