import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';
import ClientRepository from '@modules/clients/typeorm/repositories/ClientRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';

interface IProduct{
  id:string;
  quantity:number;
  
}
interface IRequest{
  client_id:string;
  products: IProduct[]
}

class CreateOrderService {
  public async execute({client_id, products}:IRequest): Promise<Order|undefined> {
    const orderRepository = getCustomRepository(OrderRepository);
    const clientRepository = getCustomRepository(ClientRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const clientExists = await clientRepository.findOne(client_id);
    if(!clientExists){
      throw new AppError('Client not found');
    }
    const productsExists = await productRepository.findAllByIds(products);

    if(!productsExists.length){
      throw new AppError('Could not find any products whith the given ids');
    }
    const productsExistsIds = productsExists.map(product=>product.id)

    const checkInexistentProduct =  products.filter(product => !productsExistsIds.includes(product.id));

    if(checkInexistentProduct.length){
      throw new AppError(`Could not find products with ids: ${checkInexistentProduct.map(product=>product.id).join(', ')}`);
    }

    const quantityAvailable = products.filter(
      product => productsExists.filter(
      p =>p.id === product.id)[0].quantity<product.quantity);

    if(quantityAvailable.length) {
      throw new AppError(`Not enough quantity for products with ids: ${quantityAvailable.map(product=>product.id).join(', ')}`);
    }

    const serializedProduct = products.map(
      product=>({
        product_id: product.id,
        quantity: product.quantity,
        price: productsExists.filter(p=>p.id === product.id)[0].price,
      })
      
    )

    const order = await orderRepository.createOrder({
      client: clientExists,
      products: serializedProduct,
    });

    const {order_products} = order;

    const updateQuantity = order_products.map(product =>({
      id: product.product_id,
      quantity: productsExists.filter(p=> p.id === product.product_id)[0].quantity - product.quantity
    }))
    await productRepository.save(updateQuantity);

    return order
  }
}
export default CreateOrderService;