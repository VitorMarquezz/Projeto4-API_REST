
const swaggerDocument = {
  openapi: "3.0.3",
  info: {
    title: "API Livraria",
    version: "1.0.0",
    description:
      "API REST de livros e autores feita com Node.js, Express e MongoDB. " +
      "Para cadastrar um livro, cadastre o autor primeiro e use o id dele.",
  },
  // "/" faz o "Try it out" funcionar tanto no seu PC quanto no Render
  servers: [{ url: "/" }],
  tags: [
    { name: "Livros", description: "Cadastro e busca de livros" },
    { name: "Autores", description: "Cadastro e busca de autores" },
  ],

  paths: {
    "/livros": {
      get: {
        tags: ["Livros"],
        summary: "Lista todos os livros",
        responses: {
          200: {
            description: "Lista de livros",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Livro" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Livros"],
        summary: "Cadastra um livro",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/LivroInput" } },
          },
        },
        responses: {
          201: {
            description: "Livro criado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Livro" } } },
          },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          404: { $ref: "#/components/responses/AutorNaoEncontrado" },
        },
      },
    },

    "/livros/search": {
      get: {
        tags: ["Livros"],
        summary: "Busca livros por editora",
        parameters: [
          {
            name: "editora",
            in: "query",
            required: true,
            schema: { type: "string" },
            example: "Ática",
          },
        ],
        responses: {
          200: {
            description: "Livros da editora (lista vazia se não houver)",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Livro" } },
              },
            },
          },
        },
      },
    },

    "/livros/{id}": {
      parameters: [{ $ref: "#/components/parameters/Id" }],
      get: {
        tags: ["Livros"],
        summary: "Busca um livro pelo id",
        responses: {
          200: {
            description: "Livro encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Livro" } } },
          },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/LivroNaoEncontrado" },
        },
      },
      put: {
        tags: ["Livros"],
        summary: "Atualiza um livro",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LivroAtualizacao" },
            },
          },
        },
        responses: {
          200: {
            description: "Livro atualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Livro" } } },
          },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          404: { $ref: "#/components/responses/LivroNaoEncontrado" },
        },
      },
      delete: {
        tags: ["Livros"],
        summary: "Remove um livro",
        responses: {
          204: { description: "Livro removido" },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/LivroNaoEncontrado" },
        },
      },
    },

    "/autores": {
      get: {
        tags: ["Autores"],
        summary: "Lista todos os autores",
        responses: {
          200: {
            description: "Lista de autores",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Autor" } },
              },
            },
          },
        },
      },
      post: {
        tags: ["Autores"],
        summary: "Cadastra um autor",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/AutorInput" } },
          },
        },
        responses: {
          201: {
            description: "Autor criado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Autor" } } },
          },
          400: { $ref: "#/components/responses/DadosInvalidos" },
        },
      },
    },

    "/autores/{id}": {
      parameters: [{ $ref: "#/components/parameters/Id" }],
      get: {
        tags: ["Autores"],
        summary: "Busca um autor pelo id",
        responses: {
          200: {
            description: "Autor encontrado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Autor" } } },
          },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/AutorNaoEncontrado" },
        },
      },
      put: {
        tags: ["Autores"],
        summary: "Atualiza um autor",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/AutorInput" } },
          },
        },
        responses: {
          200: {
            description: "Autor atualizado",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Autor" } } },
          },
          400: { $ref: "#/components/responses/DadosInvalidos" },
          404: { $ref: "#/components/responses/AutorNaoEncontrado" },
        },
      },
      delete: {
        tags: ["Autores"],
        summary: "Remove um autor",
        responses: {
          204: { description: "Autor removido" },
          400: { $ref: "#/components/responses/IdInvalido" },
          404: { $ref: "#/components/responses/AutorNaoEncontrado" },
        },
      },
    },
  },

  // Peças reaproveitadas pelas rotas acima
  components: {
    parameters: {
      Id: {
        name: "id",
        in: "path",
        required: true,
        description: "Id do MongoDB (24 caracteres)",
        schema: { type: "string" },
      },
    },

    schemas: {
      Autor: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6650f1c2a1b2c3d4e5f60718" },
          nome: { type: "string", example: "Machado de Assis" },
          nacionalidade: { type: "string", example: "brasileira" },
        },
      },
      AutorInput: {
        type: "object",
        required: ["nome"],
        properties: {
          nome: { type: "string", example: "Machado de Assis" },
          nacionalidade: { type: "string", example: "brasileira" },
        },
      },
      Livro: {
        type: "object",
        properties: {
          _id: { type: "string", example: "6650f2d9a1b2c3d4e5f60720" },
          titulo: { type: "string", example: "Dom Casmurro" },
          editora: { type: "string", example: "Ática" },
          preco: { type: "number", example: 30 },
          paginas: { type: "integer", example: 256 },
          autor: { $ref: "#/components/schemas/Autor" },
        },
      },
      LivroInput: {
        type: "object",
        required: ["titulo", "autor"],
        properties: {
          titulo: { type: "string", example: "Dom Casmurro" },
          editora: { type: "string", example: "Ática" },
          preco: { type: "number", example: 30 },
          paginas: { type: "integer", example: 256 },
          autor: {
            type: "string",
            description: "Id de um autor já cadastrado",
            example: "6650f1c2a1b2c3d4e5f60718",
          },
        },
      },
      LivroAtualizacao: {
        type: "object",
        description: "Envie só os campos que quer mudar",
        properties: {
          titulo: { type: "string", example: "Dom Casmurro (edição revista)" },
          editora: { type: "string", example: "Ática" },
          preco: { type: "number", example: 35 },
          paginas: { type: "integer", example: 256 },
        },
      },
      Erro: {
        type: "object",
        properties: {
          message: { type: "string" },
          detalhes: { type: "array", items: { type: "string" } },
        },
      },
    },

    responses: {
      IdInvalido: {
        description: "Id em formato inválido",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
            example: { message: "Id inválido" },
          },
        },
      },
      DadosInvalidos: {
        description: "Campo obrigatório faltando, tipo errado ou id inválido",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
            example: { message: "Dados inválidos", detalhes: ["Path `titulo` is required."] },
          },
        },
      },
      LivroNaoEncontrado: {
        description: "Nenhum livro com esse id",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
            example: { message: "Livro não encontrado" },
          },
        },
      },
      AutorNaoEncontrado: {
        description: "Nenhum autor com esse id",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Erro" },
            example: { message: "Autor não encontrado" },
          },
        },
      },
    },
  },
};

export default swaggerDocument;