import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest{
  id:string;
  name:string;
  price:number;

}
class UpateProductService{
  public async execute({id, name, price}: IRequest): Promise<Product|undefined>{
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productRepository.findOne(id);
    
    if(!product){
      throw new AppError('Product not found',404);
    }
    const updatedProduct = productRepository.create({
      name,
      price,
    });
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await productRepository.update(product.id, updatedProduct);

    return updatedProduct;
  }
}
export default UpateProductService;