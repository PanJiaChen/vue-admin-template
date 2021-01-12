import request from '@/utils/request'

export function getAllProviders() {
  return request({
    url: '/provider/all',
    method: 'get'
  })
}

export function queryProviders(data) {
  return request({
    url: '/provider/query',
    method: 'post',
    data
  })
}

export function addProviders(data) {
  return request({
    url: '/provider/add',
    method: 'post',
    data
  })
}

export function modifyProviders(data) {
  return request({
    url: '/provider/modify',
    method: 'post',
    data
  })
}

export function deleteProviders(data) {
  return request({
    url: '/provider/delete',
    method: 'post',
    data
  })
}
