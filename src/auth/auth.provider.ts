import { RefreshTokenEntity } from './Entity/refreshToken.entity';

export const jwtProviders = [
  {
    provide: 'JWT_REPOSITORY',
    useValue: RefreshTokenEntity,
  },
];
