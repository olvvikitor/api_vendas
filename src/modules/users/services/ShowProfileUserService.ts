import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';


interface IRequest{
  user_id:string;
}

class ShowProfileUserService{
  public async execute({user_id}:IRequest): Promise<User>{
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.findById(user_id);
    if(!users){
      throw new AppError('User not found');
    }
    return users;
  }
}
export default ShowProfileUserService;