import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import purchasesRouter from '@modules/purchases/infra/http/routes/purchases.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/purchases', purchasesRouter);

export default routes;
