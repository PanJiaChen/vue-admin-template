import request from '@/utils/request'

const api_name = '/admin/vod/videoVisitor'

export default {

  findCount(courseId, startDate, endDate) {
    return request({
      url: `${api_name}/findCount/${courseId}/${startDate}/${endDate}`,
      method: 'get'
    })
  }
}
