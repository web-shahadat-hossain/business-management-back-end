import { balanceRouters } from '../app/Modules/balance/balance.router';
import { buyRouters } from '../app/Modules/buy/buy.router';
import { costRouters } from '../app/Modules/cost/cost.router';
import { mainRouters } from '../app/Modules/main/main.router';
import { sellRouters } from '../app/Modules/sell/sell.router';
import { userRouters } from '../app/Modules/user/user.route';

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
  {
    path: '/create',
    route: userRouters.router,
  },
];

export default modulesRoutes;
