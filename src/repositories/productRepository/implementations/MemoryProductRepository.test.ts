import { ProductMapper } from '../../../entities/Product/ProductMapper';
import { FindProductError } from '../errors/FindProductError';
import { ProductAlreadyExistsError } from '../errors/ProductAlreadyExistsError';
import { UpdateProductError } from '../errors/UpdateProductError';
import { MemoryProductRepository } from './MemoryProductRepository';

const memoryProductRepository = MemoryProductRepository.getInstance();

const sampleProduct = ProductMapper.toDomain({
  value: 10,
  quantity: 100,
  description: 'produto para teste',
  title: 'teste',
});

const sampleUpdatedProduct = ProductMapper.toDomain({
  id: sampleProduct.id,
  value: 10,
  quantity: 100,
  description: 'produto teste atualizado',
  title: 'teste',
});

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Memory Product repository unit test', () => {
  it('should create new product', async () => {
    expect(
      memoryProductRepository.create(ProductMapper.toPersistence(sampleProduct)),
    ).resolves.toEqual(sampleProduct);
  });

  it('should not create product that already exists', async () => {
    expect(
      memoryProductRepository.create(ProductMapper.toPersistence(sampleProduct)),
    ).rejects.toThrow(ProductAlreadyExistsError);
  });

  it('should find a product', async () => {
    expect(memoryProductRepository.findById({ id: sampleProduct.id })).resolves.toEqual(
      sampleProduct,
    );
  });

  it('should return null when not foud a product', async () => {
    expect(memoryProductRepository.findById({ id: 'teste' })).resolves.toEqual(null);
  });

  it('should get all products', async () => {
    expect(memoryProductRepository.getAll()).resolves.toEqual([sampleProduct]);
  });

  it('should update product', async () => {
    expect(
      memoryProductRepository.update(ProductMapper.toPersistence(sampleUpdatedProduct)),
    ).resolves.toMatchObject({
      description: sampleUpdatedProduct.description,
      title: sampleUpdatedProduct.title,
      quantity: sampleUpdatedProduct.quantity,
      id: sampleUpdatedProduct.id,
      value: sampleUpdatedProduct.value,
    });
  });

  it('should throw a error when not found product to update', async () => {
    expect(
      memoryProductRepository.update({ id: 'teste', description: 'descrição atualizada' }),
    ).rejects.toThrow(UpdateProductError);
  });

  it('should delete product', async () => {
    await memoryProductRepository.delete({ id: sampleProduct.id });
    const products = await memoryProductRepository.getAll();
    expect(products).toEqual([]);
  });

  it('should throw a error when product was not found', async () => {
    expect(memoryProductRepository.delete({ id: sampleProduct.id })).rejects.toThrow(
      FindProductError,
    );
  });
});
