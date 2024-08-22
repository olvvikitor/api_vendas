import {Router} from 'express';
import UserController from '../controllers/UserController'; 
import SessionControler from '../controllers/SessionsControllerController';
import { auth } from '@shared/http/middleweres/auth';
import { celebrate, Joi, Segments } from 'celebrate';
const profileRouter = Router();
const userController = new UserController();
profileRouter.use(auth)

profileRouter.get('/show', userController.showProfile);

profileRouter.put('/update',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    confirm_password: Joi.string().valid(Joi.ref('password'))
    .when('password',{
      is: Joi.exist(),
      then: Joi.required()
    })
  }),
 
}), userController.updateProfile);

export default profileRouter;