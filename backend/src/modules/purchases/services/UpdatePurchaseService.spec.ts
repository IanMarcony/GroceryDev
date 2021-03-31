import Product from '@modules/products/infra/typeorm/entities/Product';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import AppError from '@shared/errors/AppError';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import UpdatePurchaseService from './UpdatePurchaseService';

let fakePurchasesRepository: FakePurchasesRepository;
let fakeProductsRepository: FakeProductsRepository;
let updatePurchase: UpdatePurchaseService;

describe('UpdatePurchaseService', () => {
  beforeEach(() => {
    fakePurchasesRepository = new FakePurchasesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    updatePurchase = new UpdatePurchaseService(fakePurchasesRepository);
  });

  it('should be able to update a Purchase', async () => {
    const update = jest.spyOn(fakePurchasesRepository, 'update');

    const { id: prodId1 } = await fakeProductsRepository.create({
      name: 'product1',
      description: 'product1',
      price: 1,
    });
    const { id: prodId2 } = await fakeProductsRepository.create({
      name: 'product2',
      description: 'product2',
      price: 2,
    });
    const { id: prodId3 } = await fakeProductsRepository.create({
      name: 'product3',
      description: 'product3',
      price: 3,
    });

    const products = await fakeProductsRepository.findProductsWithId([
      prodId1,
      prodId2,
      prodId3,
    ]);

    const purchase = await fakePurchasesRepository.create({
      pay_type: 'credit card',

      products,
    });

    await updatePurchase.execute({
      id: purchase.id,
      pay_type: 'cash',
      status: 'FINALIZADO',
      products,
    });

    expect(update).toHaveBeenCalled();
    expect(purchase.pay_type).toBe('cash');
  });

  it('should be able to update a Purchase with another product', async () => {
    const update = jest.spyOn(fakePurchasesRepository, 'update');

    const { id: prodId1 } = await fakeProductsRepository.create({
      name: 'product1',
      description: 'product1',
      price: 1,
    });
    const { id: prodId2 } = await fakeProductsRepository.create({
      name: 'product2',
      description: 'product2',
      price: 2,
    });
    const { id: prodId3 } = await fakeProductsRepository.create({
      name: 'product3',
      description: 'product3',
      price: 3,
    });
    const { id: prodId4 } = await fakeProductsRepository.create({
      name: 'product4',
      description: 'product4',
      price: 4,
    });

    const products = await fakeProductsRepository.findProductsWithId([
      prodId1,
      prodId2,
      prodId3,
    ]);

    const purchase = await fakePurchasesRepository.create({
      pay_type: 'credit card',

      products,
    });

    const productsUpdated = await fakeProductsRepository.findProductsWithId([
      prodId1,
      prodId2,
      prodId4,
    ]);

    const updatedPurchase = await updatePurchase.execute({
      id: purchase.id,
      pay_type: 'cash',
      status: 'FINALIZADO',
      products: productsUpdated,
    });

    expect(update).toHaveBeenCalled();
    expect(updatedPurchase.pay_type).toBe('cash');
    expect(updatedPurchase.total).toBe(7);
  });

  it('should be able to update a Purchase with more products', async () => {
    const update = jest.spyOn(fakePurchasesRepository, 'update');

    const { id: prodId1 } = await fakeProductsRepository.create({
      name: 'product1',
      description: 'product1',
      price: 1,
    });
    const { id: prodId2 } = await fakeProductsRepository.create({
      name: 'product2',
      description: 'product2',
      price: 2,
    });
    const { id: prodId3 } = await fakeProductsRepository.create({
      name: 'product3',
      description: 'product3',
      price: 3,
    });
    const { id: prodId4 } = await fakeProductsRepository.create({
      name: 'product4',
      description: 'product4',
      price: 4,
    });

    const products = await fakeProductsRepository.findProductsWithId([
      prodId1,
      prodId2,
      prodId3,
    ]);

    const purchase = await fakePurchasesRepository.create({
      pay_type: 'credit card',

      products,
    });

    const productsUpdated = await fakeProductsRepository.findProductsWithId([
      prodId1,
      prodId2,
      prodId4,
      prodId3,
    ]);

    const updatedPurchase = await updatePurchase.execute({
      id: purchase.id,
      pay_type: 'cash',
      status: 'FINALIZADO',
      products: productsUpdated,
    });

    expect(update).toHaveBeenCalled();
    expect(updatedPurchase.pay_type).toBe('cash');
    expect(updatedPurchase.total).toBe(10);
    expect(updatedPurchase.products.length).toBe(4);
  });

  it('should be able to update a Purchase with more products', async () => {
    await expect(
      updatePurchase.execute({
        id: '112334',
        pay_type: 'cash',
        status: 'FINALIZADO',
        products: [new Product(), new Product()],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
