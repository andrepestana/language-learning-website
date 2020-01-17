import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleCmp from './article/components/article-cmp'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
	routes: [
		{path: '/', component: ArticleCmp},
  ]
})
