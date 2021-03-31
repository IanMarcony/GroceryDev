import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;
let createProduct: CreateProductService;

describe('UpdateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    updateProduct = new UpdateProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to update a product', async () => {
    const update = jest.spyOn(fakeProductsRepository, 'update');

    const product = await createProduct.execute({
      name: 'lata',
      description: 'lata',
      price: 10,
    });

    await updateProduct.execute({
      id: product.id,
      name: 'lata1',
      description: 'lata1',
      price: 20,
    });

    expect(product.name).toBe('lata1');
    expect(update).toHaveBeenCalled();
  });

  it('should not be able to update a product with non-existing id', async () => {
    await expect(
      updateProduct.execute({
        id: '100',
        name: 'lata1',
        description: 'lata1',
        price: 20,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
