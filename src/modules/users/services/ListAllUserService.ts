import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListAllUserService{
  public async execute(): Promise<User[]|null>{
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }
}
export default ListAllUserService;