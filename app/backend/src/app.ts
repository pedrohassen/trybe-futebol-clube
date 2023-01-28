import * as express from 'express';
import { LoginRoute, TeamRoute, MatchRoute, LeaderBoardRoute } from './routes';

const loginRoute = new LoginRoute();
const teamRoute = new TeamRoute();
const matchRoute = new MatchRoute();
const leaderBoardRoute = new LeaderBoardRoute();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    this.app.use('/login', loginRoute.router);

    this.app.use('/teams', teamRoute.router);

    this.app.use('/matches', matchRoute.router);

    this.app.use('/leaderboard', leaderBoardRoute.router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
