import * as express from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';

const controller = new LeaderBoardController();

export default class LeaderBoardRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/');
    this.router.get('/home', controller.getLeaderboardHome);
    this.router.get('/away', controller.getLeaderboardAway);
  }
}
