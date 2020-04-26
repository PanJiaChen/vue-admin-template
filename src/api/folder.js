import request from '@/utils/request'

export function getTreeInfo(data) {
  return request({
    url: '/folder/list',
    method: 'post',
    data
  })
}

