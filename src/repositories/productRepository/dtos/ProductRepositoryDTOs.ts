import { Type } from '../../../types';
import { Product } from '../../../types/Types';

export type CreateDTO = Type.Product;
export type CreateReturnDTO = Promise<Product>;
export type UpdateDTO = Partial<Omit<Type.Product, 'id' | 'createdAt' | 'updatedAt'>> & {
  id: string;
};
export type UpdateReturnDTO = Promise<Product>;
export type FindByIdDTO = {
  id: string;
};
export type FindByIdReturnDTO = Promise<Product | null>;
export type DeleteDTO = {
  id: string;
};
export type DeleteReturnDTO = Promise<void>;
export type GetAllReturnDTO = Promise<Product[]>;
