# Atividade 01 - Integração com ViaCEP

API em Node + Express que consulta o ViaCEP.

Desenvolvimento Web III - 4º semestre

## Rodando

```
npm install
npm start
```

Servidor em http://localhost:3000

## Rotas

- GET /cep/:numero -> retorna o endereço em JSON
- GET /endereco/:uf/:cidade/:logradouro -> busca por texto, igual a documentação do viacep
- GET /cep/:numero/xml -> mesma rota de cep só que em XML

Exemplos:

```
GET /cep/83321000
GET /endereco/PR/Curitiba/Sete de Setembro
GET /cep/83321000/xml
```

# Atividade 02 - Frontend / Login (CRUD de usuários)

API de usuários (Node + Express + Sequelize + SQLite) e tela React (Vite) com modal de cadastro, edição, exclusão e busca por ID.

## Backend

```
cd backend
npm install
npm start
```

Servidor em http://localhost:3001

Rotas:

- GET /api/usuarios -> lista todos os usuários
- GET /api/usuarios/:id -> busca usuário por ID
- POST /api/usuarios -> cria usuário (nome, email, senha)
- PUT /api/usuarios/:id -> edita usuário
- DELETE /api/usuarios/:id -> exclui usuário

## Frontend

```
cd frontend
npm install
npm run dev
```

Tela em http://localhost:5173
