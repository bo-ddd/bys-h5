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
      // 创建简历 
      path:"/createResume",
      name:"createResume",
      component:() => import('@/views/createResume/CreateResume.vue')
    },
    {
      //  附件简历
      path:"/appendixResume",
      name:"appendixResume",
      component:() => import('@/views/appendixResume/AppendixResume.vue')
    },
    {
      // 职业测评 未完成测评
      path:"/evaluation",
      name:"evaluation",
      component:() => import('@/views/evaluation/EvaluationView.vue')
    },
    {
      // 职业测评 去测评页面
      path:"/question",
      name:"question",
      component:() => import('@/views/evaluation/QuestionView.vue')
    },
    {
      // 投递反馈
      path:"/deliveryfeedback",
      name:"deliveryfeedback",
      component:() => import('@/views/deliveryfeedback/deliveryfeedback.vue')
    },
    {
      // 我的收藏
      path:"/collection",
      name:"collection",
      component:() => import('@/views/collection/CollectionView.vue')
    },
    {
      // 我的面试
      path:"/inter",
      name:"inter",
      component:() => import('@/views/inter/InterView.vue')
    },
    {
      // 求职状态
      path:"/jobStatus",
      name:"jobStatus",
      component:() => import('@/views/jobStatus/JobStatusView.vue')
    },
    {
      // 意见反馈
      path:"/feedBack",
      name:"feedBack",
      component:() => import('@/views/feedBack/feedBack.vue')
    },
    {
      // 站点设置
      path:"/siteSettings",
      name:"siteSettings",
      component:() => import('@/views/siteSettings/SiteSettings.vue')
    },
  ]
})

export default router
