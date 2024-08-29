import Client from './../../../clients/typeorm/entities/Client';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrderProducts from './OrdersProducts';

@Entity('orders')
class Order{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(()=>Client)
  @JoinColumn({name: 'client_id'})
  client: Client

  @OneToMany(()=>OrderProducts, orderProducts=>orderProducts.order)
  order_products: OrderProducts[]

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

}
export default Order