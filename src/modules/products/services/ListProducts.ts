import { getCustomRepository } from "typeorm";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";

class ListProductService {
  public async execute(): Promise<Product[] | null> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.findAll();
    return products;
  }
}
export default ListProductService;