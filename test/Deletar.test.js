const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para Deletar', () => {
  it('deletar uma pessoa por ID', async () => {
    const id = 1; 

    const response = await request(app)
      .delete(`/api/pessoa/${id}`)
      .expect(200);

    expect(response.body.message).toBe('Deletado com sucesso!');
  });

  it('retornar erro 500 ao tentar deletar pessoa com ID inválido', async () => {
    const id = 'abc'; 

    const response = await request(app)
      .delete(`/api/pessoa/${id}`)
      .expect(500);

    expect(response.body.message).toBe('Favor corretamente o id.');
  });

  it('retornar erro 500 ao tentar deletar pessoa com erro interno', async () => {
    jest.spyOn(repositorio, 'Deletar').mockImplementation(() => {
      throw new Error('Erro interno ao deletar pessoa.');
    });

    const id = 1; 

    const response = await request(app)
      .delete(`/api/pessoa/${id}`)
      .expect(500);

    expect(response.body.message).toBe('Erro interno ao deletar pessoa.');
  });

  it('retornar erro 404 ao tentar deletar pessoa inexistente', async () => {
    const id = 999; 

    const response = await request(app)
      .delete(`/api/pessoa/${id}`)
      .expect(404);

    expect(response.body.message).toBe('Pessoa não encontrada.');
  });
});
