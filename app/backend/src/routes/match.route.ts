import * as express from 'express';
import MatchController from '../controllers/match.controller';

const matchControler = new MatchController();

export default class MatchRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', matchControler.getAllMatches);
    this.router.get('/search', matchControler.getAllMatches);
  }
}
