import Team from '../database/models/Team';

export default class TeamService {
  public getAllTeams = async () => {
    const teamsData = await Team.findAll();

    return teamsData;
  };

  public getTeamById = async (id: number | string) => {
    const teamData = await Team.findByPk(id);

    return teamData;
  };
}
