import {Router} from 'express';
import UserController from '../controllers/UserController'; 
import SessionControler from '../controllers/SessionsControllerController';
import { auth } from '@shared/http/middleweres/auth';
import { celebrate, Joi, Segments } from 'celebrate';
const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionControler;

userRouter.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }}),
  userController.createUser);


  //rota temporaria
userRouter.get('/',auth, userController.listAllUsers);

export default userRouter;