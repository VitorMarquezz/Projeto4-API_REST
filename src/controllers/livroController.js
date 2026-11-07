import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorId(req, res, next) {
    try {
      const livroEncontrado = await livro.findById(req.params.id);
      if (!livroEncontrado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    try {
      const novoLivro = req.body;

      // Antes, se o autor não existisse, o código quebrava com erro 500
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      const livroCriado = await livro.create({
        ...novoLivro,
        autor: autorEncontrado.toObject(),
      });
      res.status(201).json(livroCriado);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      // new: devolve o livro já atualizado
      // runValidators: aplica as regras do modelo também na atualização
      const livroAtualizado = await livro.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!livroAtualizado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(200).json(livroAtualizado);
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const livroDeletado = await livro.findByIdAndDelete(req.params.id);
      if (!livroDeletado) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }
      res.status(204).send();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    try {
      const { editora } = req.query;
      const livrosPorEditora = await livro.find({ editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;