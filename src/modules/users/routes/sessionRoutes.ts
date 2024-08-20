import {Router} from 'express';
import { celebrate,Joi, Segments } from 'celebrate';
import SessionControler from '../controllers/SessionsControllerController';
const sessionRouter = Router();
const sessionController = new SessionControler;


sessionRouter.post('/', celebrate({
  [Segments.BODY]:{
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}),sessionController.create);

export default sessionRouter;