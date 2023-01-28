import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

const service = new LeaderBoardService();

export default class LeaderBoardController {
  public getLeaderboardAll = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service.getLeaderboardAll();
    return res.status(200).send(result);
  };

  public getLeaderboardHome = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service.getLeaderboardHome();
    return res.status(200).send(result);
  };

  public getLeaderboardAway = async (
    _req: Request,
    res: Response,
  ) => {
    const result = await service.getLeaderboardAway();
    return res.status(200).send(result);
  };
}
