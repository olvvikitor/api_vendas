import CreateProductService from '../services/CreateProductService';
import { Request, Response } from 'express';
import ListProductService from '../services/ListProducts';
import FindProductService from '../services/FindProductService';
import UpateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';


class ProductController{
  public async createProduct(request: Request, response: Response): Promise<Response>{
    const { name, price, quantity } = request.body;
    const createProductService = new CreateProductService;
    const product =  await createProductService.execute({
      name,
      price, 
      quantity
    });
    return response.status(200).json(product);

  }
  public async findAll(request:Request, response:Response):Promise<Response>{
    console.log(request.user.id)
    const listProducts = new ListProductService;
    const products = await listProducts.execute();
    return response.status(200).json(products);
  }
  public async findByName(request:Request, response:Response):Promise<Response>{
    const name = request.params.name;
    const findProductService = new FindProductService;
    const product = await findProductService.execute(name);
    return response.status(200).json(product);
  }
  public async updateProduct(request: Request, response:Response): Promise<Response>{
    const { name, price, quantity } = request.body;
    const id = request.params.id;
    const updateProductService = new UpateProductService;
    const product = await updateProductService.execute({
      id,
      name,
      price,
    });
    return response.status(200).json(product);
  }
  public async deleteProduct(request: Request, response:Response): Promise<Response>{
    const id = request.params.id;
    const deleteProductService = new DeleteProductService;
    await deleteProductService.execute({
      id});
    return response.status(204).send();
  
  }
}
export default ProductController;