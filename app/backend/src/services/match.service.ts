import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatchService {
  public team = Team;
  public match = Match;
  public getAllMatches = async () => {
    const matchesData = await Match.findAll({
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
}
