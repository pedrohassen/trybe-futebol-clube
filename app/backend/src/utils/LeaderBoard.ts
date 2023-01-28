import { IMatch } from '../interfaces/match.interface';
import { ITeam } from '../interfaces/team.interface';

export default class LeaderBoard {
  public name: string;
  public totalPoints = 0;
  public totalGames = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = 100.00;

  constructor(team: ITeam) {
    this.name = team.teamName;
    this.resolveLeaderboard(team);
  }

  public winner() {
    this.totalVictories += 1;
    this.totalPoints += 3;
  }

  public draw() {
    this.totalDraws += 1;
    this.totalPoints += 1;
  }

  public loser() {
    this.totalLosses += 1;
  }

  public balance() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  public goals(matches: IMatch[], local: boolean) {
    if (local) {
      matches.forEach((match) => {
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;
        this.balance();
      });
    }

    if (!local) {
      matches.forEach((match) => {
        this.goalsFavor += match.awayTeamGoals;
        this.goalsOwn += match.homeTeamGoals;
        this.balance();
      });
    }
  }

  public getEfficiency() {
    if (!this.totalGames) return 100;
    return +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  public resolveLeaderboard(team: ITeam) {
    if (team.homeMatches) {
      this.totalGames += team.homeMatches.length;
      this.goals(team.homeMatches, true);
      team.homeMatches.forEach((match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) this.winner();
        else if (match.homeTeamGoals < match.awayTeamGoals) this.loser();
        else this.draw();
      });
    }

    if (team.awayMatches) {
      this.totalGames += team.awayMatches.length;
      this.goals(team.awayMatches, false);
      team.awayMatches.forEach((match) => {
        if (match.awayTeamGoals > match.homeTeamGoals) this.winner();
        else if (match.awayTeamGoals < match.homeTeamGoals) this.loser();
        else this.draw();
      });
    } this.efficiency = this.getEfficiency();
  }
}
