import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDtoInfo } from './dto/userCreate.dto';
import { UserEntity } from './Entity/user.entity';
import { normalizeUser } from './utils/normalizeUser';

import { compare, genSalt, hash } from 'bcryptjs';
import { UserDtoLogin } from './dto/userLogin.dto';
import { IUserCreate, TChangePassword } from './user.types';
import { IID } from 'src/common.types';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof UserEntity,
  ) {}

  async addUser(dto: IUserCreate) {
    const { email, password } = dto;

    const user = await this.getUserByEmail(email);

    if (user) {
      return new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await this.generatePassword(password);

    const userEntity = new UserDtoInfo({ ...dto, password: hashPassword });

    const newUser = await this.userRepository.create(userEntity);
    return normalizeUser(newUser);
  }

  async getUsers() {
    const users = await this.userRepository.findAll();

    const currentUsers = users.map((user) => normalizeUser(user));
    return currentUsers;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    return normalizeUser(user);
  }

  async getUserByLogin({ email, password }: UserDtoLogin) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      return new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      return new HttpException(
        'Неверный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return normalizeUser(user);
  }

  async deleteUser({ id }: IID) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return new HttpException('Ошибка удаления', HttpStatus.BAD_REQUEST);
    }
    await user.destroy();

    return true;
  }

  async changePassword(id: string, payload: TChangePassword) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException(
        'Пользователь не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const areEqual = await compare(payload.oldPassword, user.password);

    if (!areEqual) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await this.generatePassword(payload.newPassword);

    await user.update({ password: hashPassword });

    return true;
  }

  private async generatePassword(password: string) {
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    return hashPassword;
  }
}
