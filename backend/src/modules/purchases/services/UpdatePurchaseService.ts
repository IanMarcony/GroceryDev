import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest extends ICreatePurchaseDTO {
  id: string;
  status: string;
}

@injectable()
class UpdatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute({
    id,
    pay_type,
    products,
    status,
  }: IRequest): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findById(id);

    if (!purchase) {
      throw new AppError('Purchase does not exist');
    }

    purchase.pay_type = pay_type;
    purchase.products = products;
    purchase.status = status;

    return await this.purchasesRepository.update(purchase);
  }
}

export default UpdatePurchaseService;
