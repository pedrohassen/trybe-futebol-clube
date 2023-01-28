import Match from '../database/models/Match';

export interface ITeam {
  id: number,
  teamName: string,
  homeMatches?: [Match],
  awayMatches?: [Match],
}
