import {Router} from 'express';
import { celebrate,Joi, Segments } from 'celebrate';
import SessionControler from '../controllers/SessionsControllerController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController;

// http:localhost:5000/password/forgot
passwordRouter.post('/forgot', celebrate({
  [Segments.BODY]:{
    email: Joi.string().email().required(),
  }
}),forgotPasswordController.create);

export default passwordRouter;