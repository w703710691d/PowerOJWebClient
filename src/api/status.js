import request from '@/utils/request'

/**
 * status接口
 * @param {*} parameter 
 */
export function fetchStatusListData(parameter) {
    return request({
        url: '/dev/status/index',
        method: 'post',
        data: parameter
    })
}