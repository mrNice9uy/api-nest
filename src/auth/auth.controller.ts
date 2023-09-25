import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDtoCreate } from '../user/dto/userCreate.dto';
import { UserDtoLogin } from '../user/dto/userLogin.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: UserDtoLogin, @Res() res) {
    const response = await this.authService.login(dto);

    if (response instanceof UnauthorizedException) {
      throw response;
    }

    if ('accessToken' in response) {
      res.cookie('accessToken', response.accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
    }

    const { refreshToken } = response;

    return res.send({ refreshToken });
  }

  @Post('register')
  async register(@Body() dto: UserDtoCreate, @Res() res) {
    const response = await this.authService.register(dto);

    if (response instanceof HttpException) {
      throw response;
    }

    if ('accessToken' in response) {
      res.cookie('accessToken', response.accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
    }

    const { refreshToken } = response;

    return res.send({ refreshToken });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request, @Res() res) {
    const response = await this.authService.logout(request.user.id);
    if (response instanceof HttpException) {
      throw response;
    }

    res.cookie();

    return res.send(true);
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto, @Res() res) {
    const response = await this.authService.refreshToken(dto);
    if (response instanceof UnauthorizedException) {
      throw response;
    }

    if ('accessToken' in response) {
      res.cookie('accessToken', response.accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
    }

    const { refreshToken } = response;

    return res.send({ refreshToken });
  }
}
