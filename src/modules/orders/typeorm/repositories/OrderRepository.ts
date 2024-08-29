import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Client from '@modules/clients/typeorm/entities/Client';
import Product from '@modules/products/typeorm/entities/Product';

interface IProduct{
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  client : Client,
  products: IProduct[],
}

@EntityRepository(Order)
class OrderRepository extends Repository<Order>{
  public async findById(id:string): Promise<Order|undefined>{
    const order = await this.findOne(id,{
      relations:['order_products', 'client']
    });
    return order;
  }
  public async createOrder({client, products}: IRequest):Promise<Order>{
    const order = this.create({
      client,
      order_products: products
    });
    await this.save(order);
    return order;
  }
}
export default OrderRepository;