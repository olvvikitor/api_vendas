import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListAllUserService from '../services/ListAllUserService';
import CreateSessionService from '../services/CreateSessionService';

class UserController {
  public async createUser(request: Request, response:Response): Promise<Response> {
    const {name, email, password} = request.body;
    const createUserService= new CreateUserService;
    const user = await createUserService.execute({
      name,
      email,
      password,
  });
  return response.status(200).json(user);
  }
  public async ListAllUsers(request: Request, response: Response):Promise<Response>{
    const listUser = new ListAllUserService;
    console.log(request.user.id)
    const users = await listUser.execute();
    return response.status(200).json(users);
    }

}
export default UserController;