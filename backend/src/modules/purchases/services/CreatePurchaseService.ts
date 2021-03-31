import Product from '@modules/products/infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest {
  pay_type: string;
  status: string;
  products: Product[];
}

@injectable()
class CreatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  public async execute({
    pay_type,
    products,
    status,
  }: IRequest): Promise<Purchase> {
    const purchase = await this.purchasesRepository.create({
      pay_type,
      products,
      status,
    });

    return purchase;
  }
}

export default CreatePurchaseService;
