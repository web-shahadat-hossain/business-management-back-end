import express from 'express';
import modulesRoutes from './modules.routes';

const routers = express.Router();

modulesRoutes.forEach(route => routers.use(route.path, route.route));

export default routers;
