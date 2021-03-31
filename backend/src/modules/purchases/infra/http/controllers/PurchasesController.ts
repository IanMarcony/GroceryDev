import { Request, Response } from 'express';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import PurchasesRepository from '../../typeorm/repositories/PurchasesRepository';
import { container } from 'tsyringe';
import CreatePurchaseService from '@modules/purchases/services/CreatePurchaseService';
import UpdatePurchaseService from '@modules/purchases/services/UpdatePurchaseService';
import DeletePurchaseService from '@modules/purchases/services/DeletePurchaseService';

export default class PurchasesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { pay_type, products_id } = req.body;

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.findProductsWithId([
      ...products_id,
    ]);

    const createPurchase = container.resolve(CreatePurchaseService);

    const purchase = await createPurchase.execute({
      pay_type,
      products,
    });

    return res.status(201).json(purchase);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const purchasesRepository = new PurchasesRepository();

    const purchases = await purchasesRepository.findAll();

    return res.json(purchases);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const purchasesRepository = new PurchasesRepository();

    const purchase = await purchasesRepository.findById(id);

    if (!purchase) {
      throw new AppError('Purchase does not exist', 404);
    }

    return res.json(purchase);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, pay_type, status, products_id } = req.body;

    const productsRepository = new ProductsRepository();

    const products = await productsRepository.findProductsWithId([
      ...products_id,
    ]);

    const updatePurchase = container.resolve(UpdatePurchaseService);

    const purchase = await updatePurchase.execute({
      id,
      pay_type,
      status,
      products,
    });

    return res.json(purchase);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const deletePurchase = container.resolve(DeletePurchaseService);

    await deletePurchase.execute({ id });

    return res.status(204).json({});
  }
}
