import { getCustomRepository } from 'typeorm';
import ClientRepository from '../typeorm/repositories/ClientRepository';
import Client from '../typeorm/entities/Client';

class ShowClientByIdService {
  public async execute(id: string): Promise<Client |Client[] | undefined> {
    const clientRepository = getCustomRepository(ClientRepository);
    const client = await clientRepository.findById(id);
    if(!client){
      throw new Error('Client not found');
    }
    return client;
  }
}
export default ShowClientByIdService;