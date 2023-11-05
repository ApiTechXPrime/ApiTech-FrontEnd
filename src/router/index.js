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
                  path:'/profile',
                  component:()=>import(/* webpackChunkName: "technical"*/ '../views/technicalView.vue')
              },
              {
                  path:'/dashboard',
                  component:()=>import(/* webpackChunkName: "favorite"*/ '../views/Favorite.vue')
              },
              {
                  path:'/inbox',
                  component:()=>import(/* webpackChunkName: "inbox"*/ '../views/Inbox.vue')
              },
              {
                  path:'/tasks',
                  component:()=>import(/* webpackChunkName: "progress"*/ '../views/Task.vue')
              },
              {
                  path:'/send/:id',
                  name: 'Send',
                  component:()=>import(/* webpackChunkName: "progress"*/ '../views/Send.vue')

              }
              ]
      },
      {
          path: '/',
          redirect: 'login'
      }
      ]

})

export default router
