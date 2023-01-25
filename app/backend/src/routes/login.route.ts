import * as express from 'express';
import LoginValidation from '../middlewares/loginValidation';
import UserController from '../controllers/login.controller';

const userControler = new UserController();

const loginValidation = new LoginValidation();

export default class LoginRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/', loginValidation.loginValidation, userControler.login);
    this.router.get('/validate', loginValidation.validateToken, userControler.validate);
  }
}
