// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../page/Login.vue'
import HeadNurseLayout from '@/components/layout/HeadNurseLayout.vue'
import NurseLayout from '@/components/layout/NurseLayout.vue'
import HeadNursePlanLayout from '@/components/layout/HeadNursePlanLayout.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Register from '@/components/register/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // // 管理员端
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: AdminLayout,
  //   meta: {title: '管理员页面'},
  //   redirect:'/adminIndex',
  //   children:[
  //     //人员管理
  //     {
  //       path:'/adminIndex',
  //       name:'adminIndex',
  //       component:() => import('@/page/admin/AdminIndex'),
  //       meta:{title:'人员管理'}
  //     },
  //     // 个人中心
  //     {
  //       path: '/adminPersonal',
  //       name: 'adminPersonal',
  //       component: () => import('@/page/admin/Personal'),
  //       meta: {title: '个人中心'},
  //     },
  //   ]
  // },
  // 护士端
  {
    path: '/nurse',
    name: 'nurse',
    component: NurseLayout,
    meta: {title: '教师首页'},
    redirect: '/nurseIndex',
    children: [
      // 护士首页
      {
        path: '/nurseIndex',
        name: 'nurseIndex',
        component: () => import('@/page/nurse/NurseIndex'),
        meta: {title: '教师首页'},
      },
      // 执行情况
      {
        path: '/nurseExecute',
        name: 'nurseExecute',
        component: () => import('@/page/nurse/Execute'),
        meta: {title: '执行情况'},
      },
      // 批改列表
      {
        path: '/follow',
        name: 'follow',
        component: () => import('@/page/nurse/Follow'),
        meta: {title: '批改列表'},
      },
      // 批改详情
      {
        path: '/followDetail/:source?',
        name: 'followDetail',
        component: () => import('@/page/nurse/FollowDetail'),
        meta: {title: '批改详情'},
      },
      // 消息通知
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('@/page/nurse/Notifications'),
        meta: {title: '消息通知'},
      },
      // 个人中心
      {
        path: '/nursePersonal',
        name: 'nursePersonal',
        component: () => import('@/page/nurse/Personal'),
        meta: {title: '个人中心'},
      },
    ]
  },
  // // 护士长端
  // {
  //   path: '/headNurse',
  //   name: 'headNurse',
  //   component: HeadNurseLayout,
  //   meta: {title: '护士长首页'},
  //   redirect: '/index',
  //   children: [
  //     // 护士长首页
  //     {
  //       path: '/index',
  //       name: 'index',
  //       component: () => import('@/page/head_nurse/HeadNurseIndex'),
  //       meta: {title: '护士长首页'},
  //     },
  //     // 计划管理
  //     {
  //       path: '/planManage',
  //       name: 'planManage',
  //       component: () => import('@/page/head_nurse/planManage/PlanInfo'),
  //       meta: {title: '计划管理'},
  //     },
  //     // 执行情况
  //     {
  //       path: '/execute',
  //       name: 'execute',
  //       component: () => import('@/page/head_nurse/Execute'),
  //       meta: {title: '执行情况'},
  //     },
  //     // 异常提醒
  //     {
  //       path: '/alert',
  //       name: 'alert',
  //       component: () => import('@/page/head_nurse/alerts/AlertsHome'),
  //       meta: {title: '异常提醒'},
  //     },
  //     // 个人中心
  //     {
  //       path: '/personal',
  //       name: 'personal',
  //       component: () => import('@/page/head_nurse/Personal'),
  //       meta: {title: '个人中心'},
  //     },
  //     // 计划管理的详细信息
  //     {
  //       path: '/planDetails',
  //       name: 'planDetails',
  //       component: HeadNursePlanLayout,
  //       redirect: '/allotTask',
  //       children: [
  //         // 批改任务分配
  //         {
  //           path: '/allotTask',
  //           name: 'allotTask',
  //           component: () => import('@/page/head_nurse/planManage/AllotTask'),
  //           meta: {title: '计划管理-批改任务分配'},
  //         },
  //         // 批改进程管理
  //         {
  //           path: '/progressManage',
  //           name: 'progressManage',
  //           component: () => import('@/page/head_nurse/planManage/ProgressManage'),
  //           meta: {title: '计划管理-批改进程管理'},
  //         },
  //         // 生存分析图
  //         {
  //           path: '/survivalDia',
  //           name: 'survivalDia',
  //           component: () => import('@/page/head_nurse/planManage/SurvivalDia'),
  //           meta: {title: '计划管理-生存分析图'},
  //         },
  //         // 批改问卷列表
  //         {
  //           path: '/questionnaire',
  //           name: 'questionnaire',
  //           component: () => import('@/page/head_nurse/planManage/Questionnaire'),
  //           meta: {title: '计划管理-批改问卷列表'},
  //         },
  //         // 批改问卷制作
  //         {
  //           path: '/addQuestion',
  //           name: 'addQuestion',
  //           component: () => import('@/page/head_nurse/planManage/AddQuestion'),
  //           meta: {title: '计划管理-批改问卷制作'},
  //         },
  //         // 批改问卷详情查看
  //         {
  //           path: '/questionDetail',
  //           name: 'questionDetail',
  //           component: () => import('@/page/head_nurse/planManage/QuestionDetail'),
  //           meta: {title: '计划管理-批改问卷'},
  //         },
  //         // 患者批改记录
  //         {
  //           path: '/patientFollow',
  //           name: 'patientFollow',
  //           component: () => import('@/page/head_nurse/planManage/PatientFollow'),
  //           meta: {title: '计划管理-批改进程管理-学生批改记录'},
  //         },
  //       ]
  //     },
  //     {
  //       path: '/register',
  //       name: 'register',
  //       component:Register,
  //     },
      
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
