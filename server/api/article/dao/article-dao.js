import mongoose from "mongoose";
import Promise from "bluebird";
import articleSchema from "../model/article-model";
import _ from "lodash";

articleSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    var _query = {};

    Article.find(_query)
        .exec((err, articles) => {
          err ? reject(err)
              : resolve(articles);
        });
  });
}

articleSchema.statics.getById = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
          return reject(new TypeError("Id is not defined."));
        }

        Article.findById(id)
            .exec((err, article) => {
              err ? reject(err)
                  : resolve(article);
            });
    });
}

articleSchema.statics.createArticle = (article) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(article)) {
      return reject(new TypeError("Article is not a valid object."));
    }

    var _article = new Article(article);

    _article.save((err, saved) => {
      err ? reject(err)
      : resolve(saved);
    });
  });
}

articleSchema.statics.deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id)) {
      return reject(new TypeError("Id is not a valid string."));
    }

    Article.findByIdAndRemove(id)
        .exec((err, deleted) => {
          err ? reject(err)
              : resolve();
        });
  });
}

var Article = mongoose.model("Article", articleSchema);

export default Article;
