import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User'
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota "/login"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Verifica se o login é realizado ao ser informado email e password corretos', async () => {
    sinon.stub(UserModel, 'findOne').resolves(loginMock.dbUser as unknown as UserModel);
    const { status } = await chai.request(app).post('/login').send(loginMock.emailPass);
    expect(status).to.be.eq(200);
  });

  it('Verifica se o email é necessário para que o login seja feito corretamente', async () =>{
    const { body, status } = await chai.request(app).post('/login').send(loginMock.pass);
    expect(body).to.deep.eq({ message: 'All fields must be filled' });
    expect(status).to.be.eq(400);
  });

  it('Verifica se o password é necessário para que o login seja feito corretamente', async () => {
    sinon.stub(UserModel, 'findOne').resolves(loginMock.dbUser as unknown as UserModel);
    const { body, status } = await chai.request(app).post('/login').send(loginMock.email);
    expect(body).to.deep.eq({ message: "All fields must be filled" });
    expect(status).to.be.eq(400);
  });

  it('Verifica se o email informado incorretamente, impossibilita o login', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);
    const { body, status } = await chai.request(app).post('/login').send(loginMock.wrongEmail);
    expect(body).to.deep.eq({ message: "Incorrect email or password" });
    expect(status).to.be.eq(401);
  });

  it('Verifica se o password informado incorretamente, impossibilita o login', async () => {
    const { body, status } = await chai.request(app).post('/login').send(loginMock.wrongPass);
    expect(body).to.deep.eq({ message: "Incorrect email or password" });
    expect(status).to.be.eq(401);
  });
});