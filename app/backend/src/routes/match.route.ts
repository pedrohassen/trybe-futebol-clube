import * as express from 'express';
import LoginValidation from '../middlewares/loginValidation';
import TeamValidation from '../middlewares/teamValidation';
import MatchController from '../controllers/match.controller';

const matchControler = new MatchController();
const validations = new LoginValidation();
const teamValidation = new TeamValidation();

export default class MatchRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchControler.getAllMatches);
    this.router.get('/search', matchControler.getAllMatches);
    this.router.post(
      '/',
      validations.validateToken,
      teamValidation.validateTeams,
      matchControler.createMatch,
    );
    this.router.patch('/:id/finish', matchControler.updateMatchStatus);
  }
}
