import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Order from './Order';
import Product from '@modules/products/typeorm/entities/Product';

@Entity('order_products')
class OrderProducts{

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(()=>Order, order => order.order_products)
  @JoinColumn({name:'order_id'})
  order: Order
  
  @ManyToOne(()=>Product, product => product.orderProducts)
  @JoinColumn({name:'product_id'})
  product: Product

  @Column('uuid')
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('integer')
  quantity: number;

  created_at: Date;

}
export default OrderProducts