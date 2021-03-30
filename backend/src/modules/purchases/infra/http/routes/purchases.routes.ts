import { Router } from 'express';

import PurchasesController from '../controllers/PurchasesController';

const purchasesController = new PurchasesController();

const purchaseRoutes = Router();

purchaseRoutes.get('/all', purchasesController.index);
purchaseRoutes.get('/single', purchasesController.show);
purchaseRoutes.post('/', purchasesController.create);
purchaseRoutes.put('/', purchasesController.update);
purchaseRoutes.delete('/', purchasesController.delete);

export default purchaseRoutes;
