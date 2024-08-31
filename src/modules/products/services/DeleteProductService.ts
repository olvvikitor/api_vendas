import { getCustomRepository } from 'typeorm'
import ProductRepository from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface Irequest{
  id:string;
}

class DeleteProductService{
  public async execute({id}:Irequest) : Promise<void>{
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    const product = await productRepository.findOne(id);
    
    if(!product){
      throw new AppError('Product not found',404);
    }
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await productRepository.deleteProduct(id);
  }
}
export default DeleteProductService;