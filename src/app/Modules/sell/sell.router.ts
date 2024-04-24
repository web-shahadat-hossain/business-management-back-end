import express from 'express';
import { sellController } from './sell.controller';
// import { balancerController } from './balance.controller';

const router = express.Router();

router.post('/', sellController.createSell);
router.get('/', sellController.getSell);

export const sellRouters = {
  router,
};
