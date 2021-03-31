import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import DeletePurchaseService from './DeletePurchaseService';

let fakePurchasesRepository: FakePurchasesRepository;
let deletePurchase: DeletePurchaseService;

describe('DeletePurchaseService', () => {
  beforeEach(() => {
    fakePurchasesRepository = new FakePurchasesRepository();
    deletePurchase = new DeletePurchaseService(fakePurchasesRepository);
  });

  it('should be able to Delete a Purchase', async () => {
    const deleteFunc = jest.spyOn(fakePurchasesRepository, 'delete');

    const { id } = await fakePurchasesRepository.create({
      pay_type: 'credit card',

      products: [new Product(), new Product(), new Product()],
    });

    await deletePurchase.execute({
      id,
    });
    expect(deleteFunc).toHaveBeenCalled();
  });

  it('should not be able to Delete a Purchasewith non-existing id', async () => {
    await expect(
      deletePurchase.execute({
        id: '445465464sadsf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
