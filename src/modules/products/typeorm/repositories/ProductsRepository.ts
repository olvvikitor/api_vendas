import {  EntityRepository, Repository, Like } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
 class ProductRepository extends Repository<Product> {
  public async findByName(name:string): Promise< Product |Product[]| undefined> {
     const product = await this.find({
      where: { name : Like(`${name}%`),
      },
     });
     return product;
  }
  
  public async findExists(name:string): Promise< Product |Product[]| undefined> {
     const product = await this.findOne({
      where: { name,
      },
     });
     return product;
  }
  
  public async findAll(): Promise<Product[]> {
   const products = await this.find();
   return products;
}
  public async createProduct(product: Product): Promise<Product|void> {
    await this.save(product);
  }
  public async updateProduct(id: string, product: Product): Promise<void> {
    await this.update(id, product);
  }
  public async deleteProduct(id: string): Promise<void> {
    await this.delete(id);
  }
  // Other methods here...
  public async findById(id:string): Promise<Product|undefined> {
    const product = await this.findOne(id);
    return product;
  }
 }
export default ProductRepository;