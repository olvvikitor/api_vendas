import { getCustomRepository } from 'typeorm';
import ClientRepository from '../typeorm/repositories/ClientRepository';
import Client from '../typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

class ShowClientService {
  public async execute(name: string): Promise<Client |Client[]> {
    const clientRepository = getCustomRepository(ClientRepository);
    const client = await clientRepository.findByName(name);
    if(!client){
      throw new AppError('Client not found', 404);
    }
    return client;
  }
}
export default ShowClientService;