import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function ActiveRouter(token) {
  return request({
    url: '/group/subMenu',
    method: 'get',
    params: { token }
  })
}

export function getAllUsers() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}

export function queryUsers(data) {
  return request({
    url: '/user/query',
    method: 'post',
    data
  })
}

export function addUsers(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function modifyUsers(data) {
  return request({
    url: '/user/modify',
    method: 'post',
    data
  })
}

export function deleteUsers(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function getUserRole(data) {
  return request({
    url: '/user/query_role',
    method: 'post',
    data
  })
}

// 用户组
export function getAllGroups() {
  return request({
    url: '/group/all',
    method: 'get'
  })
}

export function modifyGroupUser() {
  return request({
    url: '/group/modifyUser',
    method: 'post'
  })
}

export function upload(data) {
  return request({
    url: '/user/upload',
    method: 'post',
    data
  })
}

export function modifypasswd(data) {
  return request({
    url: '/user/modifypasswd',
    method: 'post',
    data
  })
}

export function query_msg(data) {
  return request({
    url: '/user/msg',
    method: 'post',
    data
  })
}

export function clear_msg(data) {
  return request({
    url: '/user/clear_msg',
    method: 'post',
    data
  })
}

// 查询错误
export function error_query() {
  return request({
    url: '/error/query',
    method: 'get'
  })
}

export function error_delete() {
  return request({
    url: '/error/delete',
    method: 'get'
  })
}
