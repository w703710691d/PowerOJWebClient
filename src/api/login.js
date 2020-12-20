import request from '@/utils/request'

const userApi = {
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

export function getInfo () {
  return request({
    url: '/api/user/getUserInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}

export function getCaptcha (params) {
  return request({
    url: '/captcha/get',
    method: 'get',
    params
  })
}

export function getCaptcha111 (data1) {
  return request({
    url: '/getCatptcha',
    method: 'post',
    data: data1
  })
}

/**
 * 阳哥没写，也不知道干嘛用的，随便写的，以后再改s
 * @param {*} data 
 */
export function getSmsCaptcha(data){
  return request({
    url:'/getSmsCaptcha',
    method:'post',
    data
  })
}