import request from '@/utils/request'
/**
 * 根据时间获取成绩统计信息
 * @param {*} parameter 
 */
export function getScoreByTime (parameter) {
  return request({
    url: "/dev/score/getScoreByTime",
    method: 'get',
    params: parameter
  })
}
/**
 * 根据实验id查询成绩 8个实验的id
 * @param {*} parameter 
 */
export function getScoreById (parameter) {
  return request({
    url: "/dev/score/findScore",
    method: 'get',
    params: parameter
  })
}