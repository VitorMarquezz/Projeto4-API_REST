import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {
  // Apresentação da API para quem abrir o link principal
  app.route("/").get((req, res) =>
    res.status(200).json({
      nome: "API Livraria",
      documentacao: "/docs",
      rotas: [
        "/livros",
        "/livros/:id",
        "/livros/search?editora=Nome",
        "/autores",
        "/autores/:id",
      ],
      codigo: "https://github.com/VitorMarquezz/Projeto4-API_REST",
    })
  );

  app.use(express.json(), livros, autores);
};

export default routes;