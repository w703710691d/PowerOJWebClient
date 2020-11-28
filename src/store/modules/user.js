import storage from 'store'
import { getInfo,  } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { getGuestTokenRequest, loginRequest, logoutRequest, getUserRolesAndPermissionsRequest } from '@/api/user'

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
    loginAction ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginRequest(userInfo).then(response => {
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

    getGuestTokenAction ({ commit }) {
      return new Promise((resolve, reject) => {
        getGuestTokenRequest().then(response => {
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
    getUserRolesAndPermissionsAction ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserRolesAndPermissionsRequest().then(response => {
          const userData = response.data
          if (userData.roles && userData.permissions) {
            commit('SET_ROLES', userData.roles)
            commit('SET_PERMISSION_LIST', userData.permissions)
          } else {
            reject(new Error('获取用户权限列表失败！'))
          }
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

// 登出
    logoutAction ({ commit, state }) {
      return new Promise((resolve) => {
        logoutRequest(state.token).then(() => {
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
