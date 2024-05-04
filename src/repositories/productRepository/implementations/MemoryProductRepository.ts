import { ProductMapper } from '../../../entities/Product/ProductMapper';
import { CustomError } from '../../../errors/CustomError';
import { Type } from '../../../types';
import { IProductRepository } from '../IProductRepository';
import {
  CreateReturnDTO,
  FindByIdDTO,
  FindByIdReturnDTO,
  UpdateDTO,
  UpdateReturnDTO,
  DeleteDTO,
  DeleteReturnDTO,
  GetAllReturnDTO,
  CreateDTO,
} from '../ProductRepositoryDTOs';
import { CreateProductError } from '../errors/CreateProductError';
import { DeleteProductError } from '../errors/DeleteProductError';
import { FindProductError } from '../errors/FindProductError';
import { GetProductsError } from '../errors/GetProductsError';
import { ProductAlreadyExistsError } from '../errors/ProductAlreadyExistsError';
import { UpdateProductError } from '../errors/UpdateProductError';

export class MemoryProductRepository implements IProductRepository {
  public static instance?: IProductRepository;
  private products: Type.Product[] = [];

  private constructor() {
    this.products = [];
  }

  public static getInstance(): IProductRepository {
    if (!MemoryProductRepository.instance) {
      MemoryProductRepository.instance = new MemoryProductRepository();
    }
    return MemoryProductRepository.instance;
  }

  async create(data: CreateDTO): CreateReturnDTO {
    try {
      const product = this.products.find((product) => product.id === data.id);
      if (product) {
        throw new ProductAlreadyExistsError({
          location: __filename,
          method: 'create',
        });
      }
      this.products.push(data);
      return ProductMapper.toDomain(data);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw new CreateProductError({
        location: __filename,
        method: 'create',
      });
    }
  }
  async findById(data: FindByIdDTO): FindByIdReturnDTO {
    try {
      const product = this.products.find((product) => product.id === data.id);
      return product ? ProductMapper.toDomain(product) : null;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new FindProductError({
        location: __filename,
        method: 'findById',
      });
    }
  }
  async update(data: UpdateDTO): UpdateReturnDTO {
    try {
      const updateIndex = this.products.findIndex((product) => product.id === data.id);
      this.products[updateIndex] = {
        ...this.products[updateIndex],
        description: data.description ?? this.products[updateIndex].description,
        quantity: data.quantity ?? this.products[updateIndex].quantity,
        title: data.title ?? this.products[updateIndex].title,
        value: data.value ?? this.products[updateIndex].value,
        updatedAt: new Date(),
      };
      return ProductMapper.toDomain(this.products[updateIndex]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new UpdateProductError({
        location: __filename,
        method: 'update',
      });
    }
  }
  async delete(data: DeleteDTO): DeleteReturnDTO {
    try {
      const productToDelete = this.products.find((product) => product.id === data.id);
      if (!productToDelete) {
        throw new FindProductError({
          location: __filename,
          method: 'delete',
        });
      }
      this.products = this.products.filter((product) => product.id !== data.id);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new DeleteProductError({
        location: __filename,
        method: 'delete',
      });
    }
  }
  async getAll(): GetAllReturnDTO {
    try {
      return this.products.map((product) => ProductMapper.toDomain(product));
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new GetProductsError({
        location: __filename,
        method: 'getAll',
      });
    }
  }
}
