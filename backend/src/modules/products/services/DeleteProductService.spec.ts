import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProduct: DeleteProductService;
let createProduct: CreateProductService;

describe('DeleteProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    deleteProduct = new DeleteProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to delete a product', async () => {
    const deleteFunc = jest.spyOn(fakeProductsRepository, 'delete');

    const product = await createProduct.execute({
      name: 'lata',
      description: 'lata',
      price: 10,
    });

    await deleteProduct.execute({
      id: product.id,
    });

    expect(deleteFunc).toHaveBeenCalledWith(product.id);
  });

  it('should not be able to delete a non-existing product ', async () => {
    await expect(
      deleteProduct.execute({
        id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
