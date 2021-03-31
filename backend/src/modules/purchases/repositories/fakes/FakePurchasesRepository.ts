import ICreatePurchaseDTO from '@modules/purchases/dtos/ICreatePurchaseDTO';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../IPurchasesRepository';

import { uuid } from 'uuidv4';

export default class FakePurchasesRepository implements IPurchasesRepository {
  private purchases: Purchase[] = [];

  public async findAll(): Promise<Purchase[]> {
    return this.purchases;
  }
  public async findById(purchase_id: string): Promise<Purchase | undefined> {
    const purchase = await this.purchases.find(
      (findPurchase) => findPurchase.id === purchase_id,
    );
    return purchase;
  }
  public async create({
    pay_type,
    status,
    products,
  }: ICreatePurchaseDTO): Promise<Purchase> {
    const purchase = new Purchase();
    var total = await products.reduce(
      (total, product) => total + product.price,
      0,
    );
    Object.assign(purchase, {
      id: uuid(),
      total,
      pay_type,
      status,
      products,
    });

    await this.purchases.push(purchase);

    return purchase;
  }
  public async update(data: Purchase): Promise<Purchase> {
    const findIndex = this.purchases.findIndex(
      (findPurchase) => findPurchase.id === data.id,
    );

    var total = await data.products.reduce(
      (total, product) => total + product.price,
      0,
    );
    this.purchases[findIndex] = { ...data, total };

    return { ...data, total };
  }
  public async delete(purchase_id: string): Promise<void> {
    const findIndex = await this.purchases.findIndex(
      (findPurchase) => findPurchase.id === purchase_id,
    );
    await this.purchases.splice(findIndex, 1);
  }
}
