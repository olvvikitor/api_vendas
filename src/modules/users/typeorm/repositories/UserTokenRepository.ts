import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken>{

  public async generateToken(user_id:string):Promise<UserToken>{
    const userToken =  this.create({
      user_id,
    });
    await this.save(userToken);
    return userToken;
  }
  public async findByToken(token:string):Promise<UserToken|undefined>{
    const user =  await this.findOne({
      where:{
        token,
      },
    });
    return user;
  }

}
export default UserTokenRepository;