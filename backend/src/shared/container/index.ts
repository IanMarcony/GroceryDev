import { container } from 'tsyringe';

//Import Respositories from Modules

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

//Register dependencies on container

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
