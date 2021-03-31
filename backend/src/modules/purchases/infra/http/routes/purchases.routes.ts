import { Router } from 'express';

import PurchasesController from '../controllers/PurchasesController';

const purchasesController = new PurchasesController();

const purchasesRouter = Router();

purchasesRouter.get('/all', purchasesController.index);
purchasesRouter.get('/single', purchasesController.show);
purchasesRouter.post('/', purchasesController.create);
purchasesRouter.put('/', purchasesController.update);
purchasesRouter.delete('/', purchasesController.delete);

export default purchasesRouter;
