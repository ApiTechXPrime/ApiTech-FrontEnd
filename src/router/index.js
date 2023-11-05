import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/register',
          name: 'register',
          component: () => import('../components/register.component.vue')
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('../components/login.component.vue')
      },
      {
          path: '/home',
          name: 'home',
          component: Home,
          children:[
              {
                  path:'/home',
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
                  component:()=>import(/* webpackChunkName: "technical"*/ '../views/technicalView.vue')
              },
              {
                  path:'/Progress',
                  component:()=>import(/* webpackChunkName: "progress"*/ '../components/dashboard.component.vue')
              }
              ]
      },
      {
          path: '/',
          redirect: 'home'
      }
      ]
})

export default router
