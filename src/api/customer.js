import request from '@/utils/request'

export function getAllCustomers() {
  return request({
    url: '/customer/all',
    method: 'get'
  })
}

export function queryCustomers(data) {
  return request({
    url: '/customer/query',
    method: 'post',
    data
  })
}

export function addCustomers(data) {
  return request({
    url: '/customer/add',
    method: 'post',
    data
  })
}

export function modifyCustomers(data) {
  return request({
    url: '/customer/modify',
    method: 'post',
    data
  })
}

export function deleteCustomers(data) {
  return request({
    url: '/customer/delete',
    method: 'post',
    data
  })
}

