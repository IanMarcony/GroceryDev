import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkProductExists = await this.productsRepository.findById(id);

    if (!checkProductExists) {
      throw new AppError('Product does not exist');
    }

    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
