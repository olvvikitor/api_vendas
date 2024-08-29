import {  EntityRepository, Repository, Like, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
 class ProductRepository extends Repository<Product> {
  public async findByName(name:string): Promise< Product |Product[]| undefined> {
     const product = await this.find({
      where: { name : Like(`${name}%`),
      },
     });
     return product;
  }
  
  public async findExists(name:string): Promise< Product | undefined> {
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
  public async findAllByIds(products:IFindProducts[]): Promise<Product[]> {
   const productsIds = products.map(product => product.id);
   const exists = await this.find({
    where: { id: In(productsIds) },
   })
   return exists;
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