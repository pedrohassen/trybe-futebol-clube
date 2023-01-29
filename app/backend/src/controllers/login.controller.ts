import { Request, Response } from 'express';
import JwtFunctions from '../auth/jwtFunctions';

const jwt = new JwtFunctions();

export default class UserController {
  public login = (
    req: Request,
    res: Response,
  ): void => {
    const { user } = req.body;
    delete user.password;
    const token = jwt.create(user);

    res.status(200).json({ token });
  };

  public validate = (
    req: Request,
    res: Response,
  ) => {
    const { user } = req.body;

    return res.status(200).json({ role: user.data.role });
  };
}
