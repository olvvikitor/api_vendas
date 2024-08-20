import { Request, Response } from 'express';
import SendEmailForgotPasswordService from '../services/SendEmailForgotPasswordService';

class ForgotPasswordController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { email } = request.body;
   
    const sendEmailForgotPassword = new SendEmailForgotPasswordService();
    await sendEmailForgotPassword.execute({
      email,
    });
    return response.status(204).json();
  }
}
export default ForgotPasswordController;