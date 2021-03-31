import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { uuid } from 'uuidv4';
import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async findAll(): Promise<Product[]> {
    return this.products;
  }
  public async findById(product_id: string): Promise<Product | undefined> {
    const product = await this.products.find(
      (findProduct) => findProduct.id === product_id,
    );
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.products.find(
      (findProduct) => findProduct.name === name,
    );
    return product;
  }

  public async create({
    description,
    name,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      description,
      name,
      price,
    });
    await this.products.push(product);

    return product;
  }

  public async update(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      (findProduct) => findProduct.id === product.id,
    );
    this.products[findIndex] = product;

    return product;
  }

  public async delete(product_id: string): Promise<void> {
    const findIndex = await this.products.findIndex(
      (findProduct) => findProduct.id === product_id,
    );

    await this.products.splice(findIndex, 1);
  }
}

export default FakeProductsRepository;
