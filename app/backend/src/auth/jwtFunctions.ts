import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces/user.interface';

const secret: string = process.env.JWT_SECRET || 'your_secret';

export default class JwtFunctions {
  public create = (userData: IUser): string => {
    const token = jwt.sign({ data: userData }, secret, { expiresIn: '1d', algorithm: 'HS256' });
    return token;
  };

  public validate = (token: string): string | jwt.JwtPayload => {
    const decode = jwt.verify(token, secret);
    return decode;
  };
}
