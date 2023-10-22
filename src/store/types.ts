import { IUser } from 'src/user/user.types';

export type UsersStore = {
  users: Partial<IUser>[];
  isLoading: boolean;
  errors: string[];
  setUser: (user: Partial<IUser>) => void;
};
