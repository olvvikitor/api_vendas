import {Router} from 'express';
import UserController from '../controllers/UserController'; 
import SessionControler from '../controllers/SessionsControllerController';
import { auth } from '@shared/http/middleweres/auth';
const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionControler;

//Criação de Product
userRouter.post('/', userController.createUser);
userRouter.get('/',auth, userController.ListAllUsers);
userRouter.post('/auth', sessionController.create);

export default userRouter;