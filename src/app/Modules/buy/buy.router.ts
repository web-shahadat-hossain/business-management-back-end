import express from 'express';
import { buyController } from './buy.controller';
// import { balancerController } from './balance.controller';

const router = express.Router();

router.post('/', buyController.createBuy);
router.get('/', buyController.getBuy);

export const buyRouters = {
  router,
};
