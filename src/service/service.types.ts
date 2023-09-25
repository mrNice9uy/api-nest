export interface IService {
  price: number;
  name: string;
  description: string;
  id: string;
}

export type IServiceCreate = Omit<IService, 'id'>;

export type IServiceUpdate = Omit<IService, 'id'>;
