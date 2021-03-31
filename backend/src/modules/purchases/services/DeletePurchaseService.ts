import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeletePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkPurchaseExists = await this.purchasesRepository.findById(id);

    if (!checkPurchaseExists) {
      throw new AppError('Purchase does not exist');
    }

    await this.purchasesRepository.delete(id);
  }
}

export default DeletePurchaseService;
