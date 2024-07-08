const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para PegarUm', () => {
  it('retornar uma pessoa por ID', async () => {
    const id = 1; 

    const response = await request(app)
      .get(`/api/pessoa/${id}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(id);
  });

  it('retornar erro 500 ao tentar buscar por ID inválido', async () => {
    const id = 'abc'; 

    const response = await request(app)
      .get(`/api/pessoa/${id}`)
      .expect(500);

    expect(response.body.message).toBe('Favor corretamente o id.');
  });

  it('retornar erro 404 ao tentar buscar por ID inexistente', async () => {
    const id = 999; 

    const response = await request(app)
      .get(`/api/pessoa/${id}`)
      .expect(404);

    expect(response.body.message).toBe('Pessoa não encontrada.');
  });

  it('retornar uma pessoa com nome correto', async () => {
    const id = 1; 
    const nomeEsperado = 'Nome Teste';

    const response = await request(app)
      .get(`/api/pessoa/${id}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.nome).toBe(nomeEsperado);
  });
});
