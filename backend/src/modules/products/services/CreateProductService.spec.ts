import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a product', async () => {
    const create = jest.spyOn(fakeProductsRepository, 'create');

    const product = await createProduct.execute({
      name: 'lata',
      description: 'lata',
      price: 10,
    });

    expect(product).toHaveProperty('id');
    expect(create).toHaveBeenCalled();
  });

  it('should not be able to create a product with same name', async () => {
    await createProduct.execute({
      name: 'lata',
      description: 'lata',
      price: 10,
    });

    expect(
      createProduct.execute({
        name: 'lata',
        description: 'lata',
        price: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
