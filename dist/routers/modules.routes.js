"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const balance_router_1 = require("../app/Modules/balance/balance.router");
const buy_router_1 = require("../app/Modules/buy/buy.router");
const cost_router_1 = require("../app/Modules/cost/cost.router");
const main_router_1 = require("../app/Modules/main/main.router");
const sell_router_1 = require("../app/Modules/sell/sell.router");
const user_route_1 = require("../app/Modules/user/user.route");
const modulesRoutes = [
    {
        path: '/balance',
        route: balance_router_1.balanceRouters.router,
    },
    {
        path: '/main',
        route: main_router_1.mainRouters.router,
    },
    {
        path: '/buy',
        route: buy_router_1.buyRouters.router,
    },
    {
        path: '/sell',
        route: sell_router_1.sellRouters.router,
    },
    {
        path: '/cost',
        route: cost_router_1.costRouters.router,
    },
    {
        path: '/create',
        route: user_route_1.userRouters.router,
    },
];
exports.default = modulesRoutes;
