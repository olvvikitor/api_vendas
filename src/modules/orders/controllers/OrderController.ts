import CreateOrderService from '../services/CreateOrderService'
import { Request, Response } from 'express';
import ShowOrderById from '../services/ShowOrderService';

class OrderController {

  public async createOrder(request: Request, response: Response): Promise<Response> {
    const createOrderService = new CreateOrderService;
    const {client_id, products} = request.body

    const order = await createOrderService.execute({client_id, products});
    return response.status(200).json(order);
  }
  public async showOrder(request:Request, response:Response):Promise<Response> {
    const id = request.params.id
    const showOrderById = new ShowOrderById;
    const order = await showOrderById.execute({id});
    return response.status(200).json(order);
  }
}
export default OrderController;