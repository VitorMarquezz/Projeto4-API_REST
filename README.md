# API Livraria

API que fiz para estudar back-end com Node.js. Ela cadastra livros e autores
num banco MongoDB e permite buscar livros por editora.

**Teste online:** https://api-livraria-oy03.onrender.com/docs/

A API está no plano gratuito do Render, que desliga o servidor quando ninguém
usa. Por isso, a primeira requisição pode levar até 1 minuto. Depois disso,
responde normalmente.

## Como testar

O link acima abre a documentação feita com Swagger. Lá aparecem todas as
rotas e dá para testar cada uma pelo navegador: clique numa rota, depois em
**Try it out** e em **Execute**.

Um bom caminho para começar:

1. `GET /livros` para ver os livros cadastrados
2. `POST /autores` para cadastrar um autor (copie o `_id` da resposta)
3. `POST /livros` usando esse `_id` no campo `autor`

## Sobre o projeto

Comecei acompanhando um curso de Node.js e depois voltei para corrigir o que
ficou mal resolvido. A API respondia erro 500 para qualquer problema, inclusive
quando o erro era de quem fez o pedido, e respondia 200 mesmo quando o livro
não existia. Hoje todos os erros passam por um middleware só, que devolve o
status certo para cada caso. Também documentei as rotas com Swagger e publiquei
no Render.

## Tecnologias

Node.js, Express, MongoDB, Mongoose e Swagger. Deploy no Render, com o banco
no MongoDB Atlas.

## Rodando no seu computador

```bash
npm install
```

Copie o arquivo `.env.example` para `.env` e coloque a sua string de
conexão do MongoDB. Depois:

```bash
npm run dev
```

A API sobe em `http://localhost:8000` e a documentação em
`http://localhost:8000/docs`.

## Rotas

| Método | Rota | O que faz |
| --- | --- | --- |
| GET | `/livros` | Lista os livros |
| GET | `/livros/:id` | Busca um livro |
| GET | `/livros/search?editora=Nome` | Busca por editora |
| POST | `/livros` | Cadastra um livro |
| PUT | `/livros/:id` | Atualiza um livro |
| DELETE | `/livros/:id` | Remove um livro |
| GET | `/autores` | Lista os autores |
| GET | `/autores/:id` | Busca um autor |
| POST | `/autores` | Cadastra um autor |
| PUT | `/autores/:id` | Atualiza um autor |
| DELETE | `/autores/:id` | Remove um autor |

## Erros

- `400`: id em formato inválido ou faltando um campo obrigatório
- `404`: livro ou autor não encontrado
- `500`: erro no servidor

## O que eu quero fazer depois

- Paginação
