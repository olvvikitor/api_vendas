import ResetPasswordService from '../services/ResetPasswordService';
import { Request, Response } from 'express';
class ResetPasswordController{
  public async update(request: Request, response: Response): Promise<Response>{
    const { password, token} = request.body;
    const resetPasswordService = new ResetPasswordService;
    resetPasswordService.execute({token, password});
    return response.status(204).json();
}

}
export default ResetPasswordController;