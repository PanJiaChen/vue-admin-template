import request from '@/utils/request'

export function getTreeInfo(data) {
  return request({
    url: '/folder/list',
    method: 'post',
    data
  })
}

export function download(query) {
  return request({
    url: '/file/download',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function deleteFile(data) {
  return request({
    url: '/file/delete',
    method: 'post',
    data
  })
}

export function addFolder(data) {
  return request({
    url: '/folder/add',
    method: 'post',
    data
  })
}
