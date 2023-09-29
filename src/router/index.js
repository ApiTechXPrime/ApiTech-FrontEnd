import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'',
          component:()=>import(/* webpackChunkName: "overview"*/ '../views/Overview.vue')

        },
        {
          path:'/Favorite',
          component:()=>import(/* webpackChunkName: "favorite"*/ '../views/Favorite.vue')

        },
        {
          path:'/Inbox',
          component:()=>import(/* webpackChunkName: "inbox"*/ '../views/Inbox.vue')

        },
        {
          path:'/Technical',
          component:()=>import(/* webpackChunkName: "technical"*/ '../views/Technical.vue')

        },
        {
          path:'/Progress',
          component:()=>import(/* webpackChunkName: "progress"*/ '../views/Progress.vue')

        }
      ]
    }
  ]
})

export default router
