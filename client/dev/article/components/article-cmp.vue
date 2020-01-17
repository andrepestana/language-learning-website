<template>
  <div class="article-container">
    <form class="article-form"
          @submit.prevent="add(article)">

      <h1 class="article-title">{{title}}</h1>

      <input type="text"
              v-model="article.articleMessage"
              v-bind:class="{
                'article-error': !article.isValid()
              }"
              placeholder="Article title"
              autofocus />

      <button type="submit"
              :disabled="!article.isValid()">+</button>
    </form>

    <div class="article-list">
      <div v-for="(t, index) in articles"
           :key="t._id"
           class="article-item"
           @click="remove(t._id)">
        <p>{{t.articleMessage}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {BASE_API} from '../../app.constant'

class Article {
  constructor(t) {
    this._id = undefined
    this.articleMessage = ""

    Object.assign(this, t)
  }

  isValid() {
    return !!this.articleMessage
  }
}

const articleService = {
  getAll() {
    return axios.get(BASE_API + 'articles').then(({data}) => {
      return data.map((t) => {
        return new Article(t)
      })
    })
  },
  create(article) {
    return axios.post(BASE_API + 'articles', article).then(({data}) => {
      return new Article(data)
    })
  },
  remove(id) {
    return axios.delete(BASE_API + 'articles/' + id)
  }
}

export default {
  data() {
    return {
      title: "Articles",
      article: new Article(),
      articles: [],
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      articleService.getAll()
          .then((articles) => {
            this.articles = articles
          })
    },
    add(t) {
      articleService.create(t)
          .then((newArticle) => {
            this.articles.push(newArticle)
            this.article = new Article()
          })
    },
    remove(id) {
      articleService.remove(id)
        .then(() => {
          this.articles.forEach((article, index) => {
            if (article._id === id) {
              this.articles.splice(index, 1)
            }
          })
        })
    }
  } 
}
</script>

<style scoped>
.article-container {
  font-family: "Roboto";
  position: relative;
  max-width: 900px;
  margin: 30px auto 0;
  padding: 20px 10px 10px 10px;
  box-shadow: 0 -1px 0 #e5e5e5,
              0 0 2px rgba(0,0,0,.12),
              0 2px 4px rgba(0,0,0,.24);
}

.article-container .article-title {
  padding: 5px;
  background-color: #fff;
  position: absolute;
  font-size: 30px;
  top: -45px;
  left: 0;
  color: steelblue;
}

.article-container .article-form {
  margin-top: 20px;
}

.article-container input {
  border: none;
  border-bottom: 2px solid #ddd;
  font-size: 17px;
  padding: 5px 3px;
  width: 90%;
  box-sizing: border-box;
}

.article-container input:focus {
  outline: 0;
}

.article-container button {
  border-radius: 100%;
  padding: 10px 14px;
  font-weight: bold;
  color: #fff;
  background-color: steelblue;
  cursor: pointer;
  border: 2px solid #ddd;
  font-size: 15px;
  transition: all .2s;
}

.article-container button:focus,
.article-container button:active {
  outline: none;
}

.article-container button:disabled {
  opacity: .7;
  color: steelblue;
  background-color: #fff;
  cursor: not-allowed;
}

.article-container .article-error {
  border-bottom-color: #E22323;
}

.article-container .article-item {
  padding: 3px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.article-container .article-item:hover {
  background-color: #f1f2f3;
}
</style>