import { getCustomRepository } from "typeorm";
import Client from "../typeorm/entities/Client";
import ClientRepository from "../typeorm/repositories/ClientRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
  name: string;
  email: string;
}
class CreateClientService {
  public async execute({name, email}:IRequest): Promise<Client> {
    const clientRepository = getCustomRepository(ClientRepository);
    const clientExist = await clientRepository.findExists(email);
    
    if (clientExist) {
      throw new AppError("Client already exists", 409);
    }
    const createdClient =  clientRepository.create({
      name,
      email,
    });

    clientRepository.createClient(createdClient)
    return createdClient;
  }
}
export default CreateClientService;