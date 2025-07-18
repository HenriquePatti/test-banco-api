const { expect } = require("chai");
const { makeRequest } = require("./../../helpers/autenticacao.js");

describe('POST /login - segurança', () => {
  const bodyLogins = [
    { description: 'usuário', usuario: '<script>alert(1)</script>', senha: '123456', tipo: 'script XSS'},
    { description: 'senha', usuario: 'admin', senha: '<script>alert(1)</script>', tipo: 'script XSS'},
    { description: 'usuário', usuario: "' OR 1=1 --", senha: 'senha123', tipo: 'SQL Injection' },
    { description: 'senha', usuario: 'admin', senha: "' OR '1'='1", tipo: 'SQL Injection' }
  ]
  bodyLogins.forEach( (credentials)=>{
  it(`Deve retornar 400 quando o ${credentials.description} conter ${credentials.tipo}`, async () => {
    const response = await makeRequest("post", "/login", credentials);
    expect(response.status).to.equal(400);
  });
  })
});
