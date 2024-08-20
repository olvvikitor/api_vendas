import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User>{

  public async createUser(user:User):Promise<void>{
    console.log(user)
    await this.save(user);
  }
  public async findById(id:string):Promise<User|undefined>{
    const user =  await this.findOne({
      where:{
        id,
      },
    });
    return user;
  }
  public async findAll():Promise<User[]>{
    return await this.find();
  }
  public async updateUser(id:string,user:User):Promise<void>{
    await this.update(id,user);
  }
  public async deleteUser(id:string):Promise<void>{
    await this.delete(id);
  }
  public async findByEmail(email:string):Promise<User|undefined>{
    const user =  await this.findOne({
      where:{
        email,
      },
    });
    return user;
  }
}
export default UserRepository;