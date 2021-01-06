import request from '@/utils/request'

export function getAllMaterials() {
  return request({
    url: '/material/all',
    method: 'get'
  })
}

export function queryMaterials(data) {
  return request({
    url: '/material/query',
    method: 'post',
    data
  })
}

export function addMaterials(data) {
  return request({
    url: '/material/add',
    method: 'post',
    data
  })
}

export function modifyMaterials(data) {
  return request({
    url: '/material/modify',
    method: 'post',
    data
  })
}

export function deleteMaterials(data) {
  return request({
    url: '/material/delete',
    method: 'post',
    data
  })
}
