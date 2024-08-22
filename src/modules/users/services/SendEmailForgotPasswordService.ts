import { getCustomRepository } from 'typeorm';
import UserToken from '../typeorm/entities/UserToken';
import path from 'path';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import AppError from '@shared/errors/AppError';
import EtherealMail from '@config/mail/EtherealMail';
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

    const forgotPasswordTemlate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs' )
    await EtherealMail.sendEmail({
      to: { name:user.name,
            email: user.email
      },
      subject: `[API VENDAS] Recuperação de senha`,
      templateData:{
        file: forgotPasswordTemlate,
        variables:{
          name: user.name,
          link: `https://localhost:5000/password/reset?token=${token.token}`,
        }
      }
    });
  }
}
export default SendEmailForgotPasswordService;