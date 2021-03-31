import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ name, description, price }: IRequest): Promise<Product> {
    const checkProductExists = await this.productsRepository.findByNameAndDescription(
      name,
      description,
    );

    if (checkProductExists) {
      throw new AppError('Product already exists');
    }

    const product = await this.productsRepository.create({
      description,
      name,
      price,
    });

    return product;
  }
}

export default CreateProductService;
