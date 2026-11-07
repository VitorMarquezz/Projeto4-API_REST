import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const autorEncontrado = await autor.findById(req.params.id);
      if (!autorEncontrado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      res.status(200).json(autorEncontrado);
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json(novoAutor);
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const autorAtualizado = await autor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!autorAtualizado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      res.status(200).json(autorAtualizado);
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const autorDeletado = await autor.findByIdAndDelete(req.params.id);
      if (!autorDeletado) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      res.status(204).send();
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;