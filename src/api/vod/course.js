import request from '@/utils/request'

const api_name = '/admin/vod/course'

export default {
  //课程列表
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  //添加课程基本信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: courseInfo
    })
  },

    //id获取课程信息
  getCourseInfoById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },
  //修改课程信息
  updateCourseInfoById(courseInfo) {
    return request({
      url: `${api_name}/update`,
      method: 'post',
      data: courseInfo
    })
  },

  //获取发布课程信息
  getCoursePublishById(id) {
    return request({
      url: `${api_name}/getCoursePublishVo/${id}`,
      method: 'get'
    })
  },
  //发布课程
  publishCourseById(id) {
    return request({
      url: `${api_name}/publishCourseById/${id}`,
      method: 'put'
    })
  },

  //删除课程
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },

}
