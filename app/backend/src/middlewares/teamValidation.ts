import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

const teamService = new TeamService();

export default class TeamValidation {
  public validateTeams = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await teamService.getTeamById(homeTeamId);
    const awayTeam = await teamService.getTeamById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).send({ message: 'There is no team with such id!' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422).send({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  };
}
