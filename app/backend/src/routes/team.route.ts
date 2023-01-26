import * as express from 'express';
import TeamController from '../controllers/team.controller';

const teamControler = new TeamController();

export default class TeamRoute {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', teamControler.getAllTeams);
    this.router.get('/:id', teamControler.getTeamById);
  }
}
