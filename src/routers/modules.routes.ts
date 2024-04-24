import { balanceRouters } from '../app/Modules/balance/balance.router';
import { buyRouters } from '../app/Modules/buy/buy.router';
import { costRouters } from '../app/Modules/cost/cost.router';
import { mainRouters } from '../app/Modules/main/main.router';
import { sellRouters } from '../app/Modules/sell/sell.router';

const modulesRoutes = [
  {
    path: '/balance',
    route: balanceRouters.router,
  },
  {
    path: '/main',
    route: mainRouters.router,
  },
  {
    path: '/buy',
    route: buyRouters.router,
  },
  {
    path: '/sell',
    route: sellRouters.router,
  },
  {
    path: '/cost',
    route: costRouters.router,
  },
];

export default modulesRoutes;
