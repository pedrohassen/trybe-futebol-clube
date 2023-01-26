import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  public service = new MatchService();
  public getAllMatches = async (
    _req: Request,
    res: Response,
  ) => {
    const matches = await this.service.getAllMatches();

    return res.status(200).send(matches);
  };
}
