import { Router } from 'express';
import productRouter from '@modules/products/routes/product_routes';
import userRouter from '@modules/users/routes/userRoutes';
import sessionRouter from '@modules/users/routes/sessionRoutes';
import passwordRouter from '@modules/users/routes/passwordRoutes';
import { auth } from '../middleweres/auth';
export const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/auth', sessionRouter)
routes.use('/password',auth, passwordRouter);
 export default routes;