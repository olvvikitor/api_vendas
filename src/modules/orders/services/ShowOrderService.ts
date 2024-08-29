import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';
import ClientRepository from '@modules/clients/typeorm/repositories/ClientRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest{
  id:string;

}

class ShowOrderById {
  public async execute({id}:IRequest): Promise<Order|undefined> {
    const orderRepository = getCustomRepository(OrderRepository);
   
    const order = await orderRepository.findById(id);
    if(!order){
      throw new AppError('Order not found', 404);
    }
    return order;
  }
}
export default ShowOrderById;