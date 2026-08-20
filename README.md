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
