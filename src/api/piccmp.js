import request from '@/utils/request'

export function compare(data) {
  return request({
    url: '/facecompare/result',
    method: 'post',
    data
  })
}
