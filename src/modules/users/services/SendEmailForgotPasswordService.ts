import { getCustomRepository } from 'typeorm';
import UserToken from '../typeorm/entities/UserToken';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import AppError from '@shared/errors/AppError';

interface Irequest{
  email:string;
}

class SendEmailForgotPasswordService{
  public async execute({email}:Irequest): Promise<UserToken| void>{
    // Implement the email sending logic here
    const userRepository = getCustomRepository(UserRepository)
    const userTokenRepository = getCustomRepository(UserTokenRepository)

    const user = await userRepository.findByEmail(email);
    if(!user){
      throw new AppError('User not found', 404);
    }
    console.log(user);
    const token = await userTokenRepository.generateToken(user.id);
    console.log(token)
  }
}
export default SendEmailForgotPasswordService;