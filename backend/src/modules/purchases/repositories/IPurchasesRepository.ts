import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';

export default interface IPurchasesRepository {
  findAll(): Promise<Purchase[]>;
  findById(purchase_id: string): Promise<Purchase | undefined>;
  create(data: ICreatePurchaseDTO): Promise<Purchase>;
  update(data: Purchase): Promise<Purchase>;
  delete(purchase_id: string): Promise<void>;
}
