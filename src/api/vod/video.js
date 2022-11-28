import request from '@/utils/request'

const api_name = '/admin/vod/video'

export default {

  save(video) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: video
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  updateById(video) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: video
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  }
}
