import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface Irequest{
  name:string;
  email:string;
  password:string;
}
class CreateUserService{
  public async execute({name, email, password}:Irequest):Promise<User>{
    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository.findByEmail(email);
    if(userExist){
      throw new AppError('User already exists', 409);
    }
    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({ name, email, password:hashedPassword });
    userRepository.createUser(user);
    return user;
  }
}
export default CreateUserService;