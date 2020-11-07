import request from '@/utils/request'

export function getRouteList() {
  return request({
    url: 'vue-admin-template/route/getRoutes',
    method: 'get'
  })
}
