import { ServiceEntity } from './Entity/service.entity';

export const serviceProviders = [
  {
    provide: 'SERVICE_REPOSITORY',
    useValue: ServiceEntity,
  },
];
