import request from '@/utils/request'

const api_name = '/admin/vod/teacher'

export default {
	  //讲师列表
    pageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/findQueryPage/${page}/${limit}`,
            method: `post`,
            data: searchObj
        })
    },
    //讲师删除
    removeById(id) {
      return request({
        url: `${api_name}/remove/${id}`,
        method: `delete`
      })
    },
    //讲师添加
    saveTeacher(teacher) {
      return request({
        url: `${api_name}/saveTeacher`,
        method: `post`,
        data:teacher
      })
    },
    getById(id) {
      return request({
        url: `${api_name}/getTeacher/${id}`,
        method: `get`
      })
    },
    updateTeacher(teacher) {
      return request({
        url: `${api_name}/updateTeacher`,
        method: `post`,
        data: teacher
      })
    },
}
