import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/ComLogin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/ComRegister.vue')
    },
    {
      path: '/myArticle',
      name: 'My Article',
      component: () => import('./components/ComMyArticle.vue')
    }
  ]
})
