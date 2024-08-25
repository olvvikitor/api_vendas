import { Request, response, Response } from 'express';
import CreateClientService from '../services/CreateClientService';
import ShowClientByIdService from '../services/ShowClientByIdService';
import ShowClientService from '../services/ShowClientService';
import ListClientService from '../services/ListClientService';
class ClientController {
  public async createClient(request: Request, response: Response):Promise<Response>{
    const {name, email} = request.body;
    const createClientService = new CreateClientService;
    const client = await createClientService.execute({name, email});
    return response.status(201).json(client);
  }
  public async showClientById(request: Request, response: Response): Promise<Response>{
    const id = request.params.id;
    const showClientByIdService = new ShowClientByIdService;
    const client = await showClientByIdService.execute(id);
    return response.status(200).json(client);
  }
  public async showClientByName(request: Request, response: Response): Promise<Response>{
  const name = request.params.name;
  const showClientService = new ShowClientService;
  const client = await showClientService.execute(name);
  return response.status(200).json(client);
  }
  public async listClient(request: Request, response: Response): Promise<Response>{
    const listClientService = new ListClientService;
    const clients = await listClientService.execute();
    return response.status(200).json(clients);
  }
}
export default ClientController;