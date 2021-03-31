import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import { Request, Response } from 'express';
import ProductsRepository from '../../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      description,
      price,
    });

    return res.status(201).json(product);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const productsRepository = new ProductsRepository();

    const products = await productsRepository.findAll();

    return res.json(products);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const productsRepository = new ProductsRepository();

    const product = await productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    return res.json(product);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name, description, price } = req.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      description,
      price,
    });

    return res.json(product);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return res.status(204).json({});
  }
}
