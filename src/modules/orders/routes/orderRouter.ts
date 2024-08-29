import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { auth } from '@shared/http/middleweres/auth';
const orderController = new OrderController();

const orderRouter = Router();
orderRouter.use(auth)

orderRouter.post('/', orderController.createOrder);

orderRouter.get('/:id', orderController.showOrder);

export default orderRouter;