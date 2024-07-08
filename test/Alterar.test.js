const request = require('supertest');
const app = require('../../index.js'); 

describe('Testes de integração para Alterar', () => {
  it('alterar o nome de uma pessoa', async () => {
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

  it('retornar erro 500 ao tentar alterar pessoa com ID inválido', async () => {
    const id = 'abc'; 
    const novoNome = {
      nome: 'Novo Nome'
    };

    const response = await request(app)
      .put(`/api/pessoa/${id}`)
      .send(novoNome)
      .expect(500);

    expect(response.body.message).toBe('Favor corretamente o id.');
  });

  it('retornar erro 500 ao tentar alterar pessoa com erro interno', async () => {
    jest.spyOn(repositorio, 'Alterar').mockImplementation(() => {
      throw new Error('Erro interno ao alterar pessoa.');
    });

    const id = 1; 
    const novoNome = {
      nome: 'Novo Nome'
    };

    const response = await request(app)
      .put(`/api/pessoa/${id}`)
      .send(novoNome)
      .expect(500);

    expect(response.body.message).toBe('Erro interno ao alterar pessoa.');
  });

  it('retornar erro 500 ao tentar alterar pessoa com nome inválido', async () => {
    const id = 1; 
    const novoNome = {
      nome: ''
    };

    const response = await request(app)
      .put(`/api/pessoa/${id}`)
      .send(novoNome)
      .expect(500);

    expect(response.body.message).toBe('Favor preencher o nome.');
  });
});
