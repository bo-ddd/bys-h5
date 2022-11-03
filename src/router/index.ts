import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children:[
        {
          path: '/jobfairs',
          name: 'jobfairs',
          component: ()=>import('@/views/jobfairs/JobFairsView.vue')
        },
        {
          path: '/position',
          name: 'position',
          component: () => import('@/views/position/PositionView.vue')
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/news/NewsView.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          component: () => import('@/views/mine/MineView.vue')
        }
      ]
    },
    {
      path:"/deliveryfeedback",
      name:"deliveryfeedback",
      component:() => import('@/views/deliveryfeedback/deliveryfeedback.vue')
    }
  ]
})

export default router
