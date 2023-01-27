import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/match.interface';

export default class MatchService {
  public team = Team;
  public match = Match;
  public getAllMatches = async (inProgress: string) => {
    const where = inProgress ? { inProgress: inProgress === 'true' } : undefined;
    const matchesData = await Match.findAll({
      where,
      include: [
        {
          model: this.team, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        {
          model: this.team, as: 'awayTeam', attributes: { exclude: ['id'] },
        },
      ],
    });

    return matchesData;
  };

  public createMatch = async ({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals }: IMatch) => {
    const newMatch = await Match.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch.dataValues;
  };

  public updateMatchStatus = async (id: string) => {
    const changeMatch = await Match.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    return changeMatch;
  };

  public updateMatchResults = async ({ id, homeTeamGoals, awayTeamGoals }: IMatch) => {
    const changeMatch = await Match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );
    return changeMatch;
  };
}
