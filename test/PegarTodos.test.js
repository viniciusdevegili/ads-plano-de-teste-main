const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para PegarTodos', () => {
  it('retornar uma lista de pessoas', async () => {
    const response = await request(app)
      .get('/api/pessoas')
      .expect(201);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0); 
  });

  it('retornar erro 500 ao tentar buscar todas as pessoas com erro interno', async () => {
    jest.spyOn(repositorio, 'PegarTodos').mockImplementation(() => {
      throw new Error('Erro interno ao buscar pessoas.');
    });

    const response = await request(app)
      .get('/api/pessoas')
      .expect(500);

    expect(response.body.message).toBe('Erro interno ao buscar pessoas.');
  });

  it('retornar uma lista de pessoas vazia', async () => {
    jest.spyOn(repositorio, 'PegarTodos').mockResolvedValue([]);

    const response = await request(app)
      .get('/api/pessoas')
      .expect(201);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0); 
  });

  it('retornar lista de pessoas ordenada por nome', async () => {
    jest.spyOn(repositorio, 'PegarTodos').mockResolvedValue([
      { id: 1, nome: 'Ana' },
      { id: 2, nome: 'Carlos' },
      { id: 3, nome: 'Bruna' }
    ]);

    const response = await request(app)
      .get('/api/pessoas')
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.length).toBe(3);
    expect(response.body[0].nome).toBe('Ana');
    expect(response.body[1].nome).toBe('Bruna');
    expect(response.body[2].nome).toBe('Carlos');
  });
});
