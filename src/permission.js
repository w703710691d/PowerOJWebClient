import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  i18nRender
} from '@/locales'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult', 'forget'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/workplace'
const HomePage = '/problem'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`))
  // 登录成功
  if (storage.get(ACCESS_TOKEN)) {
    console.log(store.getters.roles)
    if (store.getters.roles.length === 0) {
      store
        .dispatch('getUserRolesAndPermissionsAction')
        .then(res => {
          const roles = res.roles
          // generate dynamic router
          store.dispatch('GenerateRoutes', {
            roles
          }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              next({
                ...to,
                replace: true
              })
            } else {
              next({
                path: redirect
              })
            }
          })
        })
        .catch(() => {
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          })
          // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
          store.dispatch('logoutAction').then(() => {
            store.dispatch('GenerateRoutes', {
              roles: ['guest']
            }).then(() => {
             
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                next({
                  ...to,
                  replace: true
                })
              } else {
                next({
                  path: redirect
                })
              }
            })
          })
        })
    } else {
      next()
    }
  } else {
    if (store.getters.roles.length === 0) {
      console.log("司姗姗")
      store.commit('SET_ROLES', ['guest'])
      store.dispatch('GenerateRoutes', {
          roles: ['guest']
        })
        .then(() => {
          router.addRoutes(store.getters.addRouters)
          const redirect = decodeURIComponent(from.query.redirect || to.path)
          if (to.path === redirect) {
            next({
              ...to,
              replace: true
            })
          } else {
            // 跳转到目的路由
            next({
              path: redirect
            })
          }
        })
    } else {
      next()
    }
    store.dispatch('getGuestTokenAction').catch(err=>{
      console.log(err)
    })
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
