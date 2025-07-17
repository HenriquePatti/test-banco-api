const { expect } = require("chai");
const loginData = require("../support/credentials/hml/login.json");
const { makeRequest } = require("../helpers/autenticacao.js");

describe("Login", () => {
  const bodyLogin = { ...loginData };
  describe("POST /login - Sucesso", () => {
    it("Deve retornar status code 200 e gerar token", async () => {
      const response = await makeRequest("post", "/login", bodyLogin);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("token");
      expect(response.body.token).to.be.a("string");
    });
  });
  
  describe('POST /login - tipo de dado no corpo da requisição', ()=> {
    const dataTypes = [ 
        { description: 'usuário é inteiro', username: 3267354827, senha: bodyLogin.senha },
        { description: 'senha é inteiro', username: bodyLogin.username, senha: parseInt(bodyLogin.senha) }
    ]

    dataTypes.forEach( (dataType)=>{
        it(`Deve retornar status code 400 quando dado de ${dataType.description}`, async ()=>{
            const errorMessage = "Usuário ou senha inválidos.";
            const response = await makeRequest("post", "/login", dataType);
            
            expect(response.status).to.be.equal(400);
            expect(response.body.error).to.equal(errorMessage);
            expect(response.body.error).to.be.a('string');
            
        })
    })
  })

  describe("POST /login - requisição inválida", () => {
    const invalidScenarios = [
      {description: "usuário vazio",bodyLogin: { username: "", senha: bodyLogin.senha },},
      {description: "senha vazia",bodyLogin: { username: bodyLogin.username, senha: "" },},
      {description: "usuário e senha vazios",bodyLogin: { username: "", senha: "" },},
      {description: "usuário undefined",bodyLogin: { username: undefined, senha: bodyLogin.senha },},
      {description: "senha undefined",bodyLogin: { username: bodyLogin.username, senha: undefined },},
      {description: "informado somente usuário",bodyLogin: { username: bodyLogin.username },},
      {description: "informado somente senha",bodyLogin: { senha: bodyLogin.senha },},
    ];

    invalidScenarios.forEach((invalidScenario) => {
      it(`Deve retornar status code 400 quando ${invalidScenario.description}`, async () => {
        const errorMessage = "Usuário e senha são obrigatórios.";
        const response = await makeRequest(
          "post",
          "/login",
          invalidScenario.bodyLogin
        );

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal(errorMessage);
        expect(response.body.error).to.be.a("string");
      });
    });
  });

  describe("POST /login - credenciais inválidas", () => {
    const invalidCredentials = [
      {description: "usuário inválido",bodyLogin: { username: "qatest", senha: bodyLogin.senha },},
      {description: "senha inválido",bodyLogin: { username: bodyLogin.username, senha: "5434323" },},
    ];

    invalidCredentials.forEach((invalidCredential) => {
      it(`Deve retornar status code 401 quando ${invalidCredential.description}`, async () => {
        const errorMessage = "Usuário ou senha inválidos.";
        const response = await makeRequest(
          "post",
          "/login",
          invalidCredential.bodyLogin
        );

        expect(response.status).to.equal(401);
        expect(response.body.error).to.equal(errorMessage);
        expect(response.body.error).to.be.a("string");
      });
    });
  });

  describe('POST /login - métodos inválidos', ()=>{

    const invalidMethods = [
        { method: 'get'     },
        { method: 'put'     },
        { method: 'patch'   },
        { method: 'delete'  },
    ];
    
    invalidMethods.forEach( (type)=>{
        it(`Deve retornar status code 405 quando usado método ${type.method}`, async ()=> {
            const response = await makeRequest(type.method, "/login", bodyLogin)
            const errorMessage = 'Método não permitido.';

            expect(response.status).to.equal(405);
            expect(response.body.error).to.equal(errorMessage);
        })
    })
  })
  
});
