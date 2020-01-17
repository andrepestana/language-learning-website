import ArticleController from "../controller/article-controller";

export default class ArticleRoutes {
  static init(router) {
    router
    .route("/api/articles")
    .get(ArticleController.getAll)
    .post(ArticleController.createArticle);

    router
    .route("/api/articles/:id")
    .delete(ArticleController.deleteArticle);
  }
}
