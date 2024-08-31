import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExist = await productRepository.findExists(name);

    if (productExist ) {
      throw new AppError("Product already exists", 500);

    }
    const redisCache = new RedisCache();

    const product = productRepository.create({ name, price, quantity });
    
    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await productRepository.createProduct(product);
    
    return product;
  }
}
export default CreateProductService;