import request from '@/utils/request'

/**
 * problerm接口
 * @param {*} parameter 
 */
export function fetchNoticeListData(parameter) {
    return request({
        url: '/notice/index',
        method: 'post',
        data: parameter
    })
}