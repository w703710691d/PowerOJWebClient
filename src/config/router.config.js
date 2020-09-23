// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import FAQ from '@/assets/FAQ.svg?inline' // 要加?inline才能显示

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    // redirect: '/problem', // 重定向
    children: [
      // Problem
      {
        path: '/problem',
        name: 'Problem', // 唯一标识符 类似id
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'Problem', keepAlive: true, icon: 'bars' } // FAQ是自己导入的svg文件
        // children: [
        //   {
        //     path: '/dashboard/workplace',
        //     name: 'Workplace',
        //     component: () => import('@/views/dashboard/Workplace'),
        //     meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
        //   }
        // ]
      },

      // Status
      {
        path: '/status',
        name: 'Status',
        // redirect: '/form/basicForm',
        component: () => import('@/views/form/basicForm'),
        meta: { title: 'Status', icon: 'check-square' }// permission: [ 'form' ] } 权限问题 form是antd本地的样式文件
      },

      // Contest
      {
        path: '/contest',
        name: 'Contest',
        component: () => import('@/views/list/TableList'),
        // redirect: '/list/table-list',
        meta: { title: 'Contest', icon: 'fire' }
      },

      // Ranklist
      {
        path: '/ranklist',
        name: 'Ranklist',
        component: () => import('@/views/profile/basic'),
        // redirect: '/profile/basic',
        meta: { title: 'Ranklist', icon: 'rise' }
      },

      // News
      {
        path: '/news',
        name: 'News',
        component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
        // redirect: '/result/success',
        meta: { title: 'News', icon: 'global' }
      },

      // Notice
      {
        path: '/notice',
        name: 'Notice',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        // redirect: '/exception/403',
        meta: { title: 'Notice', icon: 'exclamation-circle' }
      },

      // Discuss
      {
        path: '/discuss',
        name: 'Discuss',
        // component: RouteView,
        component: () => import('@/views/account/center'),
        // redirect: '/account/center',
        meta: { title: 'Discuss', icon: 'message', keepAlive: true }
      },

      // F.A.Q
      {
        path: '/faq',
        name: 'FAQ',
        component: () => import('@/views/faq/Faq'),
        meta: { title: 'F.A.Q', icon: 'question-circle', keepAlive: true }
      },

      // C Program
      {
        path: '/cprogram',
        name: 'CProgram',
        component: () => import('@/views/cprogram/Cprogram'),
        meta: { title: 'C Program', icon: 'user', keepAlive: true }
      },

      // Honor
      {
        path: '/honor',
        name: 'Honor',
        component: () => import('@/views/honor/Honor'),
        meta: { title: 'Honor', icon: 'star', keepAlive: true }
      },

      // Download
      {
        path: '/download',
        name: 'Download',
        component: () => import('@/views/download/Download'),
        meta: { title: 'Download', icon: 'download', keepAlive: true }
      },

      // Achieve
      {
        path: '/achieve',
        name: 'Achieve',
        component: () => import('@/views/achieve/Achieve'),
        meta: { title: 'Achieve', icon: 'crown', keepAlive: true }
      },

      // Scores
      {
        path: '/scores',
        name: 'Scores',
        component: () => import('@/views/scores/Scores'),
        meta: { title: 'Scores', icon: 'table', keepAlive: true }
      }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]