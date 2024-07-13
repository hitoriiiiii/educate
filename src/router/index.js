// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../page/Login.vue'
// import HeadTeacherLayout from '@/components/layout/HeadTeacherLayout.vue'
import TeacherLayout from '@/components/layout/TeacherLayout.vue'
// import HeadTeacherPlanLayout from '@/components/layout/HeadTeacherPlanLayout.vue'
// import AdminLayout from '@/components/layout/AdminLayout.vue'
// import Register from '@/components/register/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // // 安卓端
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
  // 教师端
  {
    path: '/teacher',
    name: 'teacher',
    component: TeacherLayout,
    meta: {title: '教师首页'},
    redirect: '/teacherIndex',
    children: [
      // 教师首页
      {
        path: '/teacherIndex',
        name: 'teacherIndex',
        component: () => import('@/page/teacher/TeacherIndex'),
        meta: {title: '教师首页'},
      },
      // 执行情况
      {
        path: '/teacherExecute',
        name: 'teacherExecute',
        component: () => import('@/page/teacher/Execute'),
        meta: {title: '执行情况'},
      },
      // 批改列表
      {
        path: '/follow',
        name: 'follow',
        component: () => import('@/page/teacher/Follow'),
        meta: {title: '批改列表'},
      },
      // 批改详情
      {
        path: '/followDetail/:source?',
        name: 'followDetail',
        component: () => import('@/page/teacher/FollowDetail'),
        meta: {title: '批改详情'},
      },
      {
        path: '/followDetailc/:source?',
        name: 'followDetailc',
        component: () => import('@/page/teacher/FollowDetailc'),
        meta: {title: '职业生涯规划指导'},
      },
      // 消息通知
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('@/page/teacher/Notifications'),
        meta: {title: '消息通知'},
      },
      // 个人中心
      {
        path: '/teacherPersonal',
        name: 'teacherPersonal',
        component: () => import('@/page/teacher/Personal'),
        meta: {title: '个人中心'},
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
