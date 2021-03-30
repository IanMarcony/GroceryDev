import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const productRoutes = Router();

productRoutes.get('/all', productsController.index);
productRoutes.get('/single', productsController.show);
productRoutes.post('/', productsController.create);
productRoutes.put('/', productsController.update);
productRoutes.delete('/', productsController.delete);

export default productRoutes;
