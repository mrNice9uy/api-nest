import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { UsersStore } from './types';

export const useUsersStore = create<UsersStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          users: [],
          isLoading: false,
          errors: [],
          setUser: (user) =>
            set((state) => ({
              users: [...state.users, user],
            })),
        }),
        {
          name: 'users-store',
        },
      ),
      {
        name: 'users-store',
      },
    ),
  ),
);
