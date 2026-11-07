import express from "express";
import mongoose from "mongoose";
import conectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

// Middleware de erro: o Express reconhece pelos 4 parâmetros.
// Precisa ficar DEPOIS das rotas.
app.use((erro, req, res, next) => {
  // id em formato inválido (ex.: /livros/123)
  if (erro instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "Id inválido" });
  }

  // campo obrigatório faltando ou com tipo errado
  if (erro instanceof mongoose.Error.ValidationError) {
    const detalhes = Object.values(erro.errors).map((e) => e.message);
    return res.status(400).json({ message: "Dados inválidos", detalhes });
  }

  // qualquer outro erro: problema no servidor
  console.error(erro);
  return res.status(500).json({ message: "Erro interno do servidor" });
});

export default app;