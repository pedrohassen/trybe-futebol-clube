import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import LoginService from '../services/login.service';
import JwtFunctions from '../auth/jwtFunctions';

const loginService = new LoginService();
const jwt = new JwtFunctions();

export default class LoginValidation {
  public validatePassword = async (password: string, hash: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hash);
    return result;
  };

  public loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: { email: string, password: string } = req.body;
    if (!email || !password) return res.status(400).send({ message: 'All fields must be filled' });

    const userData = await loginService.findUserByEmail(email);
    if (!userData) return res.status(401).send({ message: 'Incorrect email or password' });

    const result = await this.validatePassword(password, userData.password);

    if (!result) {
      return res.status(401).send({ message: 'Incorrect email or password' });
    }

    req.body.user = userData;

    next();
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token not found' });

    try {
      const decoded = jwt.validate(authorization);
      req.body.user = decoded;

      next();
    } catch (error) {
      return res.status(401).send({ message: 'Token must be a valid token' });
    }
  };
}
