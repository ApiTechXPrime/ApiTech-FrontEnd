import { createRouter, createWebHistory } from 'vue-router'
import SidebarTechnical from "@/TechXPrime/components/technicals/sidebar-technical.component.vue";
import SidebarClient from "@/TechXPrime/components/client/sidebar-client.component.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
          path: '/register',
          name: 'register',
          component: () => import('@/TechXPrime/components/register.component.vue')
      },
      {
          path: '/login',
          name: 'login',
          components: {
              default: () => import('@/TechXPrime/components/login.component.vue')}
      },
      {
          path: '/sideBarTechnical',
          name: 'homeTechnical',
          component: SidebarTechnical,
          children:[
              {
                  path:'homeTechnical',
                  components:{
                      inside:()=>import(/* webpackChunkName: "overview"*/ '@/TechXPrime/components/technicals/home-technical.component.vue')}
              },
              {
                  path:'profile',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "technical"*/ '@/TechXPrime/components/technicals/technical.component.vue')}
              },
              {
                  path:'dashboard',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "favorite"*/ '@/TechXPrime/components/technicals/dashboard.component.vue')}
              },
              {
                  path:'inbox',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "inbox"*/ '@/public/views/Inbox.vue')}
              },
              {
                  path:'tasks',
                  components:{
                      inside:()=>import(/* webpackChunkName: "progress"*/ '@/TechXPrime/components/technicals/task-list.component.vue')}
              },
              {
                  path:'send/:id',
                  name: 'Send',
                  components:{
                      inside:()=>import(/* webpackChunkName: "progress"*/ '@/public/views/Send.vue')}
              }
         ]
      },
      {
          path: '/sideBarClient',
          name: 'homeClient',
          component: SidebarClient,
          children:[
              {
                  path:'homeClient',
                  components:{
                      inside:()=>import(/* webpackChunkName: "overview"*/ '@/TechXPrime/components/client/home-client.component.vue')}
              },
              {
                  path:'technical',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "technical"*/ '@/TechXPrime/components/technicals/technical.component.vue')}
              },
              {
                  path:'progress',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "favorite"*/ '@/TechXPrime/components/client/view-order.component.vue')}
              },
              {
                  path:'favorite',
                  components:{
                      inside: ()=>import(/* webpackChunkName: "inbox"*/ '@/public/views/Inbox.vue')}
              },
              {
                  path:'inbox',
                  components:{
                      inside:()=>import(/* webpackChunkName: "progress"*/ '@/TechXPrime/components/technicals/task-list.component.vue')}
              },
              {
                  path:'send/:id',
                  name: 'Send',
                  components:{
                      inside:()=>import(/* webpackChunkName: "progress"*/ '@/public/views/Send.vue')}
              }

          ]
      },
      {
          path: '/',
          redirect: 'login'
      },
      {
          path:'/requests',
          name:'requests',
          component:()=>import('../public/views/Request.vue')
      },
      {
          path:'/technician',
          name:'technicians',
          component:()=>import('../public/views/List-Tecnical.vue')
      },
      {
          path:'/technician/:id',
          name: 'technician',
          components:{
              inside:()=>import(/* webpackChunkName: "progress"*/ '@/TechXPrime/components/technicals/technical.component.vue')}
      }
      ]

})

export default router
