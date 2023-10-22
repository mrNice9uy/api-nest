import { IUserDTO } from 'src/user/user.types';

export const defaultUser: IUserDTO = {
  id: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  isActive: false,
  role: 'CLIENT',
};
