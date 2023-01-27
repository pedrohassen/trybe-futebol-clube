import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public service = new MatchService();
  public getAllMatches = async (
    req: Request,
    res: Response,
  ) => {
    const { inProgress } = req.query;
    const matches = await this.service.getAllMatches(inProgress as string);

    return res.status(200).send(matches);
  };

  public createMatch = async (
    req: Request,
    res: Response,
  ) => {
    const newMatch = await this.service.createMatch(req.body);

    return res.status(201).send(newMatch);
  };

  public updateMatchStatus = async (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    await this.service.updateMatchStatus(id);

    return res.status(200).send({ message: 'Finished' });
  };
}
