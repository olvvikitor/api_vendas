import {Router} from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate,Joi, Segments} from 'celebrate';
import { auth } from '@shared/http/middleweres/auth';
const productRouter = Router();
const productControler = new ProductController();

//Criação de Product
productRouter.post('/',celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  }),
  
}), auth ,productControler.createProduct);

//Busca por todos os Products
productRouter.get('/',productControler.findAll);

//Busca por um produto
productRouter.get('/:name',celebrate({
  [Segments.PARAMS]: {name: Joi.string().required()},
}), productControler.findByName);


productRouter.put('/:id',celebrate({
  [Segments.PARAMS]: {id: Joi.string().uuid().required()},
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    quantity: Joi.number().optional()
  })
 
}), auth ,productControler.updateProduct);

productRouter.delete('/:id',celebrate({
  [Segments.PARAMS]: Joi.string().uuid().required()
 
}), auth ,productControler.deleteProduct);

export default productRouter;