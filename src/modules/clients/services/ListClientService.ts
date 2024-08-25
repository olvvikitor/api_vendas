import { getCustomRepository } from 'typeorm';
import ClientRepository from '../typeorm/repositories/ClientRepository';
import Client from '../typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

class ListClientService{
  public async execute(): Promise<Client[] | null> {
    const clientRepository = getCustomRepository(ClientRepository);
    const clients =  await clientRepository.findAll();
    // if(clients.length < 1){
    //   throw new AppError('No clients found');
    // }
    return clients;
  }
}
export default ListClientService;