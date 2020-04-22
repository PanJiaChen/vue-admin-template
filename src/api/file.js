import request from '@/utils/request'

export function uploadInit(data) {
  return request({
    url: '/file/init',
    method: 'post',
    data
  })
}
