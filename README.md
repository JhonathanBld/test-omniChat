# test-omniChat

## Clone este repositório
$ git clone <https://github.com/JhonathanBld/test-omniChat.git>

* [Como usar](#como-usar)
## Acesse a pasta do projeto no terminal/cmd
$ cd test-omniChat

## Instale as dependências
$ npm install

Necessario estar rodando o serviço do mongo;

## Execute a aplicação em modo de desenvolvimento
$ npm run dev

## O servidor inciará na porta:3000 - acesse <http://localhost:3000>

## Execute os testes via terminar
$ npm run test

## Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDb](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)

## End-points

METODO - POST
http://localhost:3000/auth/register

```json
{
	"email" : "emailteste@teste.com",
	"name": "teste",
	"password": "teste"
}
```
METODO - POST
http://localhost:3000/auth/login


```json
{
	"email" : "emailteste@teste.com",
	"name": "teste",
	"password": "teste"
}
```

Ambos geram e retornam oken para consumir o end-point de usuarios

METODO - GET
http://localhost:3000/users/

Consulta todos os usuarios

METODO - GET
http://localhost:3000/users/:id

Consulta usuario a partir do id

METODO - PUT
http://localhost:3000/users/:id
```json
{
	"email" : "emailteste@teste.com",
	"name": "teste"
}
Altera informações do usuario

METODO - DELETE
http://localhost:3000/users/:id

Remove o usuario a partir do id
