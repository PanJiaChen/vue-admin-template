import request from '@/utils/request'

const api_name = '/admin/vod/chapter'

export default {

  getNestedTreeList(courseId) {
    return request({
      url: `${api_name}/getNestedTreeList/${courseId}`,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

  save(chapter) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: chapter
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  updateById(chapter) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: chapter
    })
  }
}
