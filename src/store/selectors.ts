import { UsersStore } from './types';

const users = ({ users, setUser }: UsersStore) => ({
  users,
  setUser,
});

export const usersSelectors = {
  users,
};
