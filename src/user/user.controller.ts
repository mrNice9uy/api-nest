import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserDtoChangePassword } from './dto/userChangePassword.dto';
import { UserDtoCreate } from './dto/userCreate.dto';
import { UserDtoDelete } from './dto/userDelete.dto';
import { UserEntity } from './Entity/user.entity';
import { UserService } from './user.service';
import { IUserCreate } from './user.types';
import { IID } from 'src/common.types';
import { UserDtoChange } from './dto/userUpdate.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() request, @Res() res) {
    const user = await this.userService.getUserById(request.user.id);
    return res.send(user);
  }

  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get('all')
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiResponse({ status: 200, type: UserEntity })
  @ApiBody({ type: UserDtoCreate })
  @Post()
  async addUser(@Body() dto: IUserCreate) {
    return this.userService.addUser(dto);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @Put()
  async updateUser(@Body() dto: UserDtoChange, @Req() request, @Res() res) {
    const response = await this.userService.changeUser(request.user.id, dto);

    return res.send(response);
  }

  @ApiBody({ type: UserDtoDelete })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete()
  async deleteUser(@Body() dto: IID) {
    return this.userService.deleteUser(dto);
  }

  @ApiBody({ type: UserDtoChangePassword })
  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Body() dto: UserDtoChangePassword,
    @Req() request,
    @Res() res,
  ) {
    const response = await this.userService.changePassword(
      request.user.id,
      dto,
    );

    return res.send(response);
  }
}
