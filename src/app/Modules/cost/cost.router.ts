import express from 'express';
import { costController } from './cost.controller';
// import { balancerController } from './balance.controller';

const router = express.Router();

router.post('/', costController.createCost);
router.get('/', costController.getCost);

export const costRouters = {
  router,
};
