# 🏦 Banco API - Test Automation Estudo

## 📌 Sobre o Projeto 🚧 (Em Construção)
Este repositório contém **testes automatizados de API REST** para a aplicação **Banco API**. Os testes são escritos em **Mocha**, **Chai** e **Supertest**; os relatórios são gerados com **Mochawesome**. O objetivo principal é praticar automação de testes, boas práticas de qualidade de software e integração contínua.

## 🚀 Tecnologias Utilizadas
- **Mocha** – Framework de testes
- **Chai** – Biblioteca de asserções
- **Supertest** – Requisições HTTP
- **Mochawesome** – Relatórios de testes (HTML/JUnit)
- **Dotenv** – Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
📂 test-banco-api
 ├── 📂 support
 │   └── 📂 credentials
 │       ├── 📂 hml   # Massa de dados de login para HML
 │       └── 📂 prod  # Massa de dados de login para PROD
 │
 ├── 📂 helpers
 │   └── 📜 autenticacao.js   # Função que realiza chamadas com autenticação
 │
 ├── 📂 test
 │   └── 📜 login.test.js     # Casos de teste do endpoint /login
 │
 ├── 📜 package.json
 ├── 📜 .gitignore
 └── 📜 README.md
```

## ✅ Cenários de Teste Implementados
- **Login deve retornar status code 200 e gerar tokens** (`login.test.js`)
- **Login dados do corpo da requisição - string** (`login.test.js`)
- **Login deve retornar status code 400 requisições inválidas** (`login.test.js`)
- **Login credenciais inválidas** (`login.test.js`)
- **Login métodos inválidos** (`login.test.js`)

## 🎯 Como Executar os Testes Localmente

### 📌 Pré‑requisitos
- Node.js **18+**
- npm

### 🔹 Instalação
```bash
git clone https://github.com/HenriquePatti/banco-api-test.git
cd banco-api-test
npm install
```

### 🔹 Configuração
1. `.env`** com a URL da API:
   ```env
   HML_BASE_URL: 'http://localhost:3000
   PROD_BASE_URL: 'http://localhost:3000'
   ```
2. 
### 📄 Exemplo do `login.json` (HML) e (PROD)
```
//support/credentials/hml/login.json
/support/credentials/prod/login.json
```
```json
{
  "username": "usuario_hml",
  "senha": "senha123"
}

   ```

### 🔹 Executar os testes (headless)
```bash
npm run test:hml  - Ambiente de homologacão
npm run test:prod - Ambiente de produçao

```

## 📊 Relatórios de Teste
Após a execução, o **Mochawesome** gera:
```
mochawesome-report/
 ┣ mochawesome.html
 ┗ mochawesome.json
```
Abra **`mochawesome-report/mochawesome.html`** no navegador para visualizar o relatório interativo.

## 📄 Licença
Este projeto está licenciado sob **ISC**. Use livremente para estudo e portfólio 🚀

---
