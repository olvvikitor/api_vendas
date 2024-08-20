import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';


class SessionController{
  public async create(request: Request, response: Response): Promise<Response>{
    const {email, password} = request.body;
    const createSession = new CreateSessionService;
    const token = await createSession.execute({
      email,
      password,
    });
    return response.status(200).json(token);
  }
}
export default SessionController;

  