const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para rotas', () => {
  it('status 404 para rota inexistente', async () => {
    const response = await request(app)
      .get('/index.js')
      .expect(404);
  });

  it('status 200 ao acessar rota GET /api/pessoas', async () => {
    const response = await request(app)
      .get('/api/pessoas')
      .expect(201);

    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('status 201 ao acessar rota POST /api/pessoa', async () => {
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

  it('status 200 ao acessar rota PUT /api/pessoa/:id', async () => {
    const id = 1; 
    const novoNome = {
      nome: 'Novo Nome'
    };

    const response = await request(app)
      .put(`/api/pessoa/${id}`)
      .send(novoNome)
      .expect(200);

    expect(response.body.message).toBe('Alterado com sucesso!');
  });

  it('status 200 ao acessar rota DELETE /api/pessoa/:id', async () => {
    const id = 1; 

    const response = await request(app)
      .delete(`/api/pessoa/${id}`)
      .expect(200);

    expect(response.body.message).toBe('Deletado com sucesso!');
  });
});
