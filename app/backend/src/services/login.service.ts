import User from '../database/models/User';
import { IUser } from '../interfaces/user.interface';

export default class UserService {
  public findUserByEmail = async (email: string): Promise<IUser> => {
    const userData = await User.findOne({ where: { email } });

    return userData?.dataValues;
  };
}
