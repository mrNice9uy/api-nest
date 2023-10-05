export interface IUser {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  role: UserRole;
}

export type IUserDTO = Omit<IUser, 'password'>;

export interface IUserAuth {
  email: string;
  password: string;
}

export type IUserCreate = Pick<
  IUser,
  'email' | 'password' | 'firstName' | 'lastName' | 'middleName'
> &
  Partial<Pick<IUser, 'phone'>>;

export type TRefreshToken = {
  refreshToken: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TChangeUser = Omit<IUser, 'password' | 'id' | 'isActive' | 'role'>;

export type UserRole = 'CLIENT' | 'ADMIN';
