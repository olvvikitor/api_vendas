import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import User from "../typeorm/entities/User";
interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}
class UpdateProfileUserService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    //retorna true caso seja o mesmo id, e false csao n seja encontrado
    const emailExists = await userRepository
      .findByEmail(email)
      .then((resultado) => user?.id == resultado?.id);
    if (!emailExists) {
      throw new AppError("Email already in use", 409);
    }
    if(password && !old_password){
      throw new AppError("Old password is required", 400);
    }
    if(password && old_password){
      const passwordIsMatch = await compare(old_password, user.password);
      if (!passwordIsMatch) {
        throw new AppError("Incorrect old password", 401);
      }
       user.password = await hash(password, 8);
    }

      user.name = name,
      user.email = email,
      
      await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileUserService;