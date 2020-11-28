import storage from 'store'
import { login, getInfo, logout, getGuestToken } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import permission from './permission'

const user = {
  state: {
    token: '12345',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    permissionList: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSION_LIST: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          console.log(response)
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetGuestToken ({ commit }) {
      return new Promise((resolve, reject) => {
        getGuestToken().then(response => {
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

// 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const userData = response.data
          if (userData.listRole && userData.listRole.length) {
            const role = userData.listRole.map(item => item.name)
            commit('SET_ROLES', role)
            commit('SET_PERMISSION_LIST', userData.listPer)
            commit('SET_INFO', userData.user)
          } else {
            reject(new Error('获取用户权限列表失败！'))
          }

          // const result = response.result

          // if (result.role && result.role.permissions.length > 0) {
          //   const role = result.role
          //   role.permissions = result.role.permissions
          //   role.permissions.map(per => {
          //     if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
          //       const action = per.actionEntitySet.map(action => { return action.action })
          //       per.actionList = action
          //     }
          //   })

          //   role.permissionList = role.permissions.map(permission => { return permission.permissionId })
          //   commit('SET_ROLES', result.role)
          //   commit('SET_INFO', result)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }

          commit('SET_NAME', { name: userData.user.nick, welcome: welcome() })

          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

// 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', ['guest'])
          commit('SET_PERMISSION_LIST', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
