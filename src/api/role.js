import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/vue-admin-template/role/list',
    method: 'get',
    params
  })
}

export function deleteOneRole(data) {
  return request({
    url: '/vue-admin-template/role/deleteOne',
    method: 'delete',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/vue-admin-template/role/add',
    method: 'post',
    data
  })
}
