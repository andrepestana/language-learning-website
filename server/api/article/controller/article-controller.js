import ArticleDAO from "../dao/article-dao";

export default class ArticleController {
  static getAll(req, res) {
    ArticleDAO
      .getAll()
      .then(articles => res.status(200).json(articles))
      .catch(error => res.status(400).json(error));
  }

  static getById(req, res) {
      ArticleDAO
        .getById(req.params.id)
        .then(article => res.status(200).json(article))
        .catch(error => res.status(400).json(error));
  }

  static createArticle(req, res) {
    let _article = req.body;

    ArticleDAO
      .createArticle(_article)
      .then(article => res.status(201).json(article))
      .catch(error => res.status(400).json(error));
  }

  static deleteArticle(req, res) {
    let _id = req.params.id;

    ArticleDAO
      .deleteArticle(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
