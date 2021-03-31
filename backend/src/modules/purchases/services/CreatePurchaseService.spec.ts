import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';

let fakePurchasesRepository: FakePurchasesRepository;
let createPurchase: CreatePurchaseService;
let fakeProductsRepository: FakeProductsRepository;

describe('CreatePurchaseService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    fakePurchasesRepository = new FakePurchasesRepository();
    createPurchase = new CreatePurchaseService(fakePurchasesRepository);
  });

  it('should be able to create a new purchase', async () => {
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

    const purchase = await createPurchase.execute({
      pay_type: 'credit card',
      status: 'ABERTO',
      products,
    });

    expect(purchase.total).toBe(6);
    expect(purchase.products.length).toBe(3);
  });
});
