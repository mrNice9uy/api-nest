import { IUser, IUserDTO } from '../user.types';

export const normalizeUser = (user: IUser | null): IUserDTO => {
  if (!user) {
    return null;
  }
  const { id, firstName, lastName, middleName, phone, email, isActive, role } =
    user;

  const currentUser: IUserDTO = {
    id,
    firstName,
    lastName,
    middleName,
    phone,
    email,
    isActive,
    role,
  };

  return currentUser;
};
