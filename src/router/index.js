import { createRouter, createWebHistory } from 'vue-router'
import Home from '../public/views/Home.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/register',
          name: 'register',
          component: () => import('../TechXPrime/components/register.component.vue')
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('../TechXPrime/components/login.component.vue')
      },
      {
          path: '/home',
          name: 'home',
          component: Home,
          children:[
              {
                  path:'/home',
                  component:()=>import(/* webpackChunkName: "overview"*/ '../public/views/Overview.vue')
              },
              {
                  path:'/profile',
                  component:()=>import(/* webpackChunkName: "technical"*/ '../public/views/technicalView.vue')
              },
              {
                  path:'/dashboard',
                  component:()=>import(/* webpackChunkName: "favorite"*/ '@/TechXPrime/components/technicals/dashboard.component.vue')
              },
              {
                  path:'/inbox',
                  component:()=>import(/* webpackChunkName: "inbox"*/ '../public/views/Inbox.vue')
              },
              {
                  path:'/tasks',
                  component:()=>import(/* webpackChunkName: "progress"*/ '../public/views/Task.vue')
              },
              {
                  path:'/send/:id',
                  name: 'Send',
                  component:()=>import(/* webpackChunkName: "progress"*/ '../public/views/Send.vue')
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
