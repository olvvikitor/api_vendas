import { getCustomRepository } from 'typeorm';
import{isAfter, addHours} from 'date-fns'
import UserToken from '../typeorm/entities/UserToken';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';


interface Irequest{
  token:string;
  password:string;
}

class ResetPasswordService{
  public async execute({password,token}:Irequest): Promise<UserToken| void>{
    // Implement the email sending logic here
    const userRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)

    const userToken = await userTokenRepository.findByToken(token);
    if(!userToken){
      throw new AppError('User not found', 404);
    }
    const user = await userRepository.findById(userToken.user_id);
    if(!user){
      throw new AppError('User not found', 404);
    }
    const createdAt = userToken.created_at;
    const compareDate = addHours(createdAt, 2)
    if(isAfter(createdAt, compareDate)){
      throw new AppError('Token expired', 401);
    }
    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;

    // const token = await userTokenRepository.generateToken(user.id);
    console.log(token)
  }
}