import request from '@/utils/request'

/**
 * problerm接口
 * @param {*} parameter 
 */
export function fetchProblemListData(parameter) {
    return request({
        url: '/dev/problem/index',
        method: 'post',
        data: parameter
    })
}