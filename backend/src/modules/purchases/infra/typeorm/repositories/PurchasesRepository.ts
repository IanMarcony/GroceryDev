import { getRepository, Repository } from 'typeorm';
import Purchase from '../entities/Purchase';
import ICreatePurchaseDTO from '@modules/purchases/dtos/ICreatePurchaseDTO';
import IPurchasesRepository from '@modules/purchases/repositories/IPurchasesRepository';

export default class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async findAll(): Promise<Purchase[]> {
    const purchases = await this.ormRepository.find();

    return purchases;
  }

  public async findById(purchase_id: string): Promise<Purchase | undefined> {
    const purchase = await this.ormRepository.findOne({
      where: { id: purchase_id },
      relations: ['products'],
    });

    return purchase;
  }

  public async create({
    pay_type,
    products,
  }: ICreatePurchaseDTO): Promise<Purchase> {
    var total = await products.reduce(
      (total, product) => total + product.price,
      0,
    );
    const purchase = this.ormRepository.create({
      pay_type,
      status: 'ABERTO',
      products,
      total,
    });
    await this.ormRepository.save(purchase);

    return purchase;
  }

  public async update(data: Purchase): Promise<Purchase> {
    var total = data.products.reduce(
      (total, product) => total + product.price,
      0,
    );

    data.total = total;

    await this.ormRepository.save(data);

    return data;
  }

  public async delete(purchase_id: string): Promise<void> {
    await this.ormRepository.delete({ id: purchase_id });
  }
}
