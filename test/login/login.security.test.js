const request = require('supertest');
const { expect } = require('chai');
const baseURL = process.env.HML_BASE_URL;

describe('POST /login - segurança', () => {
  it('Deve retornar 400 quando o usuário conter script XSS', async () => {
    const res = await request(baseURL)
      .post('/login')
      .send({ usuario: '<script>alert(1)</script>', senha: '123456' });

    expect(res.status).to.equal(400);
  });

  it('Deve retornar 400 quando a senha conter script XSS', async () => {
    const res = await request(baseURL)
      .post('/login')
      .send({ usuario: 'admin', senha: '<script>alert(1)</script>' });

    expect(res.status).to.equal(400);
  });

  it('Deve retornar 400 quando o usuário simular SQL Injection', async () => {
    const res = await request(baseURL)
      .post('/login')
      .send({ usuario: "' OR 1=1 --", senha: 'senha123' });

    expect(res.status).to.equal(400);
  });

  it('Deve retornar 400 quando a senha simular SQL Injection', async () => {
    const res = await request(baseURL)
      .post('/login')
      .send({ usuario: 'admin', senha: "' OR '1'='1" });

    expect(res.status).to.equal(400);
  });
});
