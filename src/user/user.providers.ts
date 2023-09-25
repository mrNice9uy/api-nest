import { UserEntity } from './Entity/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
];
