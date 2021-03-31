import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }
  public async findById(product_id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id: product_id },
    });
    return product;
  }
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });
    return product;
  }
  public async create({
    description,
    name,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      description,
      name,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }
  public async update(product: Product): Promise<Product> {
    return await this.ormRepository.save(product);
  }
  public async delete(product_id: string): Promise<void> {
    await this.ormRepository.softDelete(product_id);
  }
}
