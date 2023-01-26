import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  public service = new TeamService();
  public getAllTeams = async (
    _req: Request,
    res: Response,
  ) => {
    const teams = await this.service.getAllTeams();

    return res.status(200).send(teams);
  };

  public getTeamById = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const team = await this.service.getTeamById(id);

    return res.status(200).send(team);
  };
}
