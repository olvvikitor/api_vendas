import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import {compare} from 'bcryptjs'
import { SECRET_KEY } from '@shared/http/middleweres/auth';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface IRequest{
  email: string;
  password: string;
}
interface IResponse{
  token: string;
}
class CreateSessionService{
  public async execute({email, password}:IRequest):Promise<IResponse>{
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if(!user){
      throw new AppError('email or password is not available', 401);
    }
    const confirmedPassword = await compare(password, user.password);
    
    if(!confirmedPassword){
      throw new AppError('email or password is not available', 401);
    }
    const token = jwt.sign({name: user.name, email: user.email }, SECRET_KEY, {
      expiresIn: '2 days',
      subject: user.id
    });

    return {token};
    }
}
export default CreateSessionService;