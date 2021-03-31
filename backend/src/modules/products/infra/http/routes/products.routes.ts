import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.get('/all', productsController.index);
productsRouter.get('/single', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/', productsController.update);
productsRouter.delete('/', productsController.delete);

export default productsRouter;
