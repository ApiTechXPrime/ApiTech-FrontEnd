import { createRouter, createWebHistory } from 'vue-router'

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
          path: '/',
          redirect: 'login'
      }
  ]
})

export default router
