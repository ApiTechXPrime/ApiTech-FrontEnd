import { createRouter, createWebHistory } from 'vue-router'
import Technical from '../components/Technical.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/technicals',
      name: 'technical',
      component: Technical
    },{
      path: '/',
      redirect: 'technical',
    }
  ]
})

export default router
