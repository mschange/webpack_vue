
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: () => import('../view/index'), meta: {title: '测试'}},
    { path: '/index', component: () => import('../view/home'), meta: {title: '首页'}},
    { path: '/detail', component: () => import('../view/detail'), meta: {title: '详情'}}
  ]
})
