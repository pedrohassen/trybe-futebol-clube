import * as express from 'express';
import LoginValidation from '../middlewares/loginValidation';
import MatchController from '../controllers/match.controller';

const matchControler = new MatchController();
const validations = new LoginValidation();

export default class MatchRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchControler.getAllMatches);
    this.router.get('/search', matchControler.getAllMatches);
    this.router.post('/', validations.validateToken, matchControler.createMatch);
    this.router.patch('/:id/finish', matchControler.updateMatchStatus);
  }
}
