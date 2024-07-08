const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para Adicionar', () => {
  it('adicionar uma nova pessoa', async () => {
    const novaPessoa = {
      nome: 'Novo Teste',
      email: 'novoteste@teste.com',
      senha: 'senha123'
    };

    const response = await request(app)
      .post('/api/pessoa')
      .send({ pessoa: novaPessoa })
      .expect(201);

    expect(response.body.message).toBe('Adicionado com sucesso!');
  });

  it('retornar erro 500 ao tentar adicionar pessoa sem nome', async () => {
    const novaPessoa = {
      email: 'teste@teste.com',
      senha: 'senha123'
    };

    const response = await request(app)
      .post('/api/pessoa')
      .send({ pessoa: novaPessoa })
      .expect(500);

    expect(response.body.message).toBe('Favor preencher o nome.');
  });

  it('retornar erro 500 ao tentar adicionar pessoa com email duplicado', async () => {
    const novaPessoa = {
      nome: 'Nome Teste',
      email: 'teste@teste.com',
      senha: 'senha123'
    };

    const response = await request(app)
      .post('/api/pessoa')
      .send({ pessoa: novaPessoa })
      .expect(500);

    expect(response.body.message).toBe('Email já cadastrado!');
  });

  it('retornar erro 500 ao tentar adicionar pessoa com erro interno', async () => {
    jest.spyOn(repositorio, 'Adicionar').mockImplementation(() => {
      throw new Error('Erro interno ao adicionar pessoa.');
    });

    const novaPessoa = {
      nome: 'Novo Teste',
      email: 'novoteste@teste.com',
      senha: 'senha123'
    };

    const response = await request(app)
      .post('/api/pessoa')
      .send({ pessoa: novaPessoa })
      .expect(500);

    expect(response.body.message).toBe('Erro interno ao adicionar pessoa.');
  });
});
