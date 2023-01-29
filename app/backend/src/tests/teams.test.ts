import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import teams from './mocks/team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/teams"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se a busca dos times funciona', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    const { status } = await chai.request(app).get('/teams').send(teams);
    expect(status).to.be.eq(200);
  });
});

describe('Testa a rota "/teams/:id"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se a busca dos times por id funciona', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as TeamModel);
    const { status } = await chai.request(app).get('/teams/:id').send(teams);
    expect(status).to.be.eq(200);
  });
});