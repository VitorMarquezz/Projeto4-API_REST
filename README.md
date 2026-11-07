# API Livraria

API que fiz para estudar back-end com Node.js. Ela cadastra livros e autores
num banco MongoDB e permite buscar livros por editora.

Comecei este projeto acompanhando um curso de Node.js. Depois voltei nele
para corrigir coisas que ficaram mal resolvidas: a API respondia erro 500
para qualquer problema, inclusive quando o erro era de quem fez o pedido,
e respondia 200 mesmo quando o livro não existia. Hoje todos os erros
passam por um middleware só, que devolve o status certo para cada caso.

## Tecnologias

Node.js, Express, MongoDB e Mongoose.

## Rodando o projeto

```bash
npm install
```

Copie o arquivo `.env.example` para `.env` e coloque a sua string de
conexão do MongoDB. Depois:

```bash
npm run dev
```

A API sobe em `http://localhost:8000`.

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

Para cadastrar um livro, o autor precisa existir antes. O campo `autor`
recebe o id dele:

```json
{
  "titulo": "Dom Casmurro",
  "editora": "Ática",
  "preco": 30,
  "paginas": 256,
  "autor": "id_do_autor"
}
```

## Erros

- `400`: id em formato inválido ou faltando um campo obrigatório
- `404`: livro ou autor não encontrado
- `500`: erro no servidor
