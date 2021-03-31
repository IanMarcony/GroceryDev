import { container } from 'tsyringe';

//Import Respositories from Modules

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IPurchasesRepository from '@modules/purchases/repositories/IPurchasesRepository';
import PurchasesRepository from '@modules/purchases/infra/typeorm/repositories/PurchasesRepository';

//Register dependencies on container

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IPurchasesRepository>(
  'PurchasesRepository',
  PurchasesRepository,
);
