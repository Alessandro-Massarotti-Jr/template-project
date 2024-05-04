import { Type } from '../../types';
import { Product } from './Product';

export class ProductMapper {
  public static toDomain(data: Type.Product): Product {
    return new Product(data);
  }

  public static toPersistence(product: Product) {
    return product;
  }

  public static toExternalHttp(product: Product) {
    return product;
  }
}
