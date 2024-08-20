import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import ProductRepository from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';

class FindProductService{
  public async execute(name:string): Promise<Product|Product[]|undefined>{
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findByName(name);
    if(!product){
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
export default FindProductService;