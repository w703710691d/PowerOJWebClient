import request from '@/utils/request'

/**
 * 根据学期统计成绩
 * @param {*} parameter
 */
export function getSemesterByYear (parameter) {
  return request({
    url: '/dev/score/getSemesterByYear',
    method: 'get',
    params:{ ...parameter}
  })
}
