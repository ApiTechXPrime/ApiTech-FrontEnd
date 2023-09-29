import { createRouter, createWebHistory } from 'vue-router'
import Technical from '../components/technical.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/technicals',
      name: 'technicals',
      component: Technical
    },{
      path: '/',
      redirect: 'technicals',
    }
  ]
})

export default router
