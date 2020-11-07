import request from '@/utils/request'

export function getRoleList(params) {
    return request({
        url: '/vue-admin-template/role/list',
        method: 'get',
        params
    }) 
}