import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
class Product{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

// c:\Users\Jussara\OneDrive\Área de Trabalho\TS\src\modules\products\repositories\ProductRepository.ts