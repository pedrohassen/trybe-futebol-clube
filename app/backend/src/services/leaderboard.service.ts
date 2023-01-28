import LeaderBoard from '../utils/LeaderBoard';
import Team from '../database/models/Team';

export default class LeaderBoardService {
  public model = Team;

  public async getLeaderboardHome() {
    return this.model.findAll({
      include: [{
        association: 'homeMatches',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderBoard(team)))
      .then((result) => result
        .sort((a, b) => b.totalPoints - a.totalPoints
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn));
  }

  public async getLeaderboardAway() {
    return this.model.findAll({
      include: [{
        association: 'awayMatches',
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
        where: { inProgress: false },
      },
      ],
    })
      .then((result) => result.map((team) => team.get({ plain: true })))
      .then((result) => result.map((team) => new LeaderBoard(team)))
      .then((result2) => result2
        .sort((a2, b2) => b2.totalPoints - a2.totalPoints
        || b2.goalsBalance - a2.goalsBalance
        || b2.goalsFavor - a2.goalsFavor
        || b2.goalsOwn - a2.goalsOwn));
  }
}
