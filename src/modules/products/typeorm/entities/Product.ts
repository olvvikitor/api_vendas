import OrderProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(()=>OrderProducts, orderProducts => orderProducts.product, {
    cascade: true
  })
  orderProducts: OrderProducts[]
  
  @Column('decimal')
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;
  
  @CreateDateColumn()
  updated_at: Date;
}
export default Product;
