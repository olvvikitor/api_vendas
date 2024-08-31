import { getCustomRepository } from 'typeorm';
import ClientRepository from '../typeorm/repositories/ClientRepository';
import Client from '../typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

interface IPaginate{
  from : number;
  to : number;
  per_page : number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number| null;
  data: Client[];
}

class ListClientService{
  public async execute(): Promise<IPaginate> {
    const clientRepository = getCustomRepository(ClientRepository);
    const clients =  await clientRepository.createQueryBuilder().paginate();
    return clients as IPaginate;
  }
}
export default ListClientService;