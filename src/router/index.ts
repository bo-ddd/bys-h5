import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/jobfairs',
          name: 'jobfairs',
          component: () => import('@/views/jobfairs/JobFairsView.vue')
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
      path: "/createResume",
      name: "createResume",
      component: () => import('@/views/createResume/CreateResume.vue')
    },
    {
      //  附件简历
      path: "/appendixResume",
      name: "appendixResume",
      component: () => import('@/views/appendixResume/AppendixResume.vue')
    },
    {
      // 职业测评 未完成测评
      path: "/evaluation",
      name: "evaluation",
      component: () => import('@/views/evaluation/EvaluationView.vue')
    },
    {
      // 职业测评 去测评页面
      path: "/question",
      name: "question",
      component: () => import('@/views/evaluation/QuestionView.vue')
    },
    {
      // 投递反馈
      path: "/deliveryfeedback",
      name: "deliveryfeedback",
      component: () => import('@/views/deliveryfeedback/deliveryfeedback.vue')
    },
    {
      // 我的收藏
      path: "/collection",
      name: "collection",
      component: () => import('@/views/save/saveView.vue')
    },
    {
      // 我的面试
      path: "/inter",
      name: "inter",
      component: () => import('@/views/inter/InterView.vue')
    },
    {
      // 求职状态
      path: "/jobStatus",
      name: "jobStatus",
      component: () => import('@/views/jobStatus/JobStatusView.vue')
    },
    {
      // 意见反馈
      path: "/feedBack",
      name: "feedBack",
      component: () => import('@/views/feedBack/feedBack.vue'),
    },
    {
      path: "/abnormalFunction",
      name: "abnormalFunction",
      component: () => import('@/views/feedBack/abnormalFunction.vue')
    }, {
      path: "/feedBackSumbit",
      name: "feedBackSumbit",
      component: () => import('@/views/feedBack/feedBackSumbit.vue')
    }, {
      path: "/reportingViolations",
      name: "reportingViolations",
      component: () => import('@/views/feedBack/reportingViolations.vue')
    },
    {
      // 站点设置
      path: "/siteSettings",
      name: "siteSettings",
      component: () => import('@/views/siteSettings/SiteSettings.vue')
    },
    {
      // 上传简历选择方式
      path: "/uploadResumeChoice",
      name: "uploadResumeChoice",
      component: () => import('@/views/uploadResume/UploadResumeChoice.vue')
    },
    {
      // 上传简历详情
      path: "/uploadResumeDetails",
      name: "uploadResumeDetails",
      component: () => import('@/views/uploadResume/UploadResumeDetails.vue')
    },
    {
      // 上传简历电脑端操作指引
      path: "/uploadResumeComputer",
      name: "uploadResumeComputer",
      component: () => import('@/views/uploadResume/UploadResumeComputer.vue')
    },
    {
      // 公司详情
      path: "/companyDetails",
      name: "companyDetails",
      component: () => import('@/views/companyDetails/CompanyDetails.vue')
    },
    {
      // 登录页面
      path: "/login",
      name: "Login",
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: "/jobIntention",
      name: "JobIntention",
      component: () => import("@/views/position/JobIntention.vue")
    },
    {
      // 企业招聘列表
      path: "/companyList",
      name: "companyList",
      component: () => import('@/views/list/EeterPrise/enterPriseList.vue')
    }, {
      // 职位招聘列表
      path: "/positionLIst",
      name: "positionLIst",
      component: () => import('@/views/position/PositionLIst.vue')
    }, {
      // 简历详情页面
      path: "/resumeDetails",
      name: "resumeDetails",
      component: () => import('@/views/uploadResume/resumeDetails.vue'),
      meta: {
        isKeepAlive: true
      },
    },
    {
      // 职业详情
      path: "/positionDetail",
      name: "positionDetail",
      component: () => import('@/views/positionDetatil/positionDetail.vue')
    },
    {
      // 修改个人情况页面
      path: "/editInfo",
      name: "editInfo",
      component: () => import('@/views/uploadResume/EditInfo.vue'),
      meta: {
        isKeepAlive: true
      },
    },
    {
      // 编辑描述 页面
      path: "/editDescribe",
      name: "editDescribe",
      component: () => import('@/views/uploadResume/EditDescribe.vue')
    },
    {
      // 个人基本信息页面
      path: "/personalInfo",
      name: "personalInfo",
      component: () => import('@/views/uploadResume/PersonalInfo.vue'),
      meta: {
        isKeepAlive: true
      },
    },
    {
      // 学校列表页面
      path: "/schoolList",
      name: "schoolList",
      component: () => import('@/views/uploadResume/SchoolList.vue'),
    },
    {
      // 专业列表页面
      path: "/majorList",
      name: "majorList",
      component: () => import('@/views/uploadResume/MajorList.vue')
    },
    {
      // 行业
      path: "/industry",
      name: "industry",
      component: () => import('@/views/position/IndustryView.vue')
    },
    {
      // 职位
      path: "/job",
      name: "job",
      component: () => import('@/views/position/JobView.vue')
    },
  ]
})

export default router
