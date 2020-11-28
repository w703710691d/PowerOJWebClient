import request from '@/utils/request'

const userApi = {
  login: '/api/user/login',
  getGuestToken: '/api/user/getGuestToken',
  getUserRolesAndPermissions: '/api/user/getUserRolesAndPermissions',
  logout: '/auth/logout'
}

export function loginRequest (parameter) {
  return request({
    url: userApi.login,
    method: 'post',
    data: parameter
  })
}

export function getGuestTokenRequest () {
  return request({
    url: userApi.getGuestToken,
    method: 'get'
  })
}

export function getUserRolesAndPermissionsRequest () {
  return request({
    url: userApi.getUserRolesAndPermissions,
    method: 'get'
  })
}

export function logoutRequest () {
  return request({
    url: userApi.logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
