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
    //根据id得到数据
    getById(id) {
      return request({
        url: `${api_name}/getTeacher/${id}`,
        method: `get`
      })
    },
    //更新数据
    updateTeacher(teacher) {
      return request({
        url: `${api_name}/updateTeacher`,
        method: `post`,
        data: teacher
      })
    },
    //批量删除
    batchRemove(idList) {
      return request({
        url: `${api_name}/removeBatch`,
        method: `delete`,
        data: idList
      })
    },

    //查询所有讲师
    list(){
      return request({
        url: `${api_name}/findAll`,
        method: `get`
      })
    }
}
