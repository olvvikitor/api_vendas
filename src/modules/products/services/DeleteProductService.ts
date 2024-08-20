import { getCustomRepository } from 'typeorm'
import ProductRepository from '../typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError';

interface Irequest{
  id:string;
}

class DeleteProductService{
  public async execute({id}:Irequest) : Promise<void>{
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    
    if(!product){
      throw new AppError('Product not found',404);
    }

    await productRepository.deleteProduct(id);
  }
}
export default DeleteProductService;