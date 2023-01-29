import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/leaderboard"', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Verifica retorno da tabela completa', async () => {
    const { status } = await chai.request(app).get('/leaderboard');
    expect(status).to.eq(200);
  });

  it('Verifica retorno da tabela completa com paginação', async () => {
    const { status } = await chai.request(app).get('/leaderboard?page=1&limit=10');
    expect(status).to.eq(200);
  });

  it('Verifica retorna da tabela completa com paginação e ordenação', async () => {
    const { status } = await chai.request(app).get('/leaderboard?page=1&limit=10&sort=totalPoints');
    expect(status).to.eq(200);
  });

  it('Verifica retorno da tabela completa com paginação e ordenação invertida', async () => {
    const { status } = await chai.request(app).get('/leaderboard?page=1&limit=10&sort=totalPoints&order=desc');
    expect(status).to.eq(200);
  });

  it('Verifica retorno da tabela de jogos em casa', async () => {
    const { status } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.eq(200);
  });

  it('Verifica retorno da tabela de jogos fora de casa', async () => {
    const { status } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.eq(200);
  });
})