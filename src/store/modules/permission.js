import {
  asyncRouterMap,
  constantRouterMap
} from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    console.log(permission, route.meta.permission, '莪涩感')

    for (let i = 0; i < permission.length; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log(state.routers)
    }
  },
  actions: {
    // 异步获取动态路由 
    GenerateRoutes({
      commit
    }, data) {
      console.log('asfnasfasfaasf', data)
      return new Promise(resolve => {
        const {
          roles
        } = data
        console.log('roles：', data)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        // console.log('当年世上的姑娘死哦')
        // commit('SET_ROUTERS', asyncRouterMap)
        resolve()
      })
    }
  }

}

export default permission