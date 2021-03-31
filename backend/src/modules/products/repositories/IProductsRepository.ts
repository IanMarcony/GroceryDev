import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(product_id: string): Promise<Product | undefined>;
  findProductsWithId(product_ids: string[]): Promise<Product[]>;
  findByNameAndDescription(
    name: string,
    description: string,
  ): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(product_id: string): Promise<void>;
}
