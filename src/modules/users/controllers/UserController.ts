import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListAllUserService from '../services/ListAllUserService';
import CreateSessionService from '../services/CreateSessionService';
import ShowProfileUserService from '../services/ShowProfileUserService';
import UpdateProfileUserService from '../services/UpdateProfileUserService';

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
  public async listAllUsers(request: Request, response: Response):Promise<Response>{
    const listUser = new ListAllUserService;
    const users = await listUser.execute();

    return response.status(200).json(users);
    }

    public async showProfile(request: Request, response: Response): Promise<Response>{
      const showProfileUserService = new ShowProfileUserService;
      const id = request.user.id;
      const profile =  await showProfileUserService.execute({user_id: id})

      return response.status(200).json(profile);
    }

    public async updateProfile(request: Request, response: Response): Promise<Response>{
      const updateProfileUserService = new UpdateProfileUserService;
      const {name, email, password, old_password} = request.body;
      const id = request.user.id;
      const profile = await updateProfileUserService.execute({user_id: id, name, email, password, old_password});
      return response.status(200).json(profile);
    }
  }
export default UserController;