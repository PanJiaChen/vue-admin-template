import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/infos',
    method: 'get',
    params
  })
}

export function getBlogById(blogId) {
  return request({
    url: '/infos/' + blogId,
    method: 'get'
  })
}

export function editBlog(blog) {
  console.log(blog)
  return request({
    url: '/infos',
    method: 'put',
    blog
  })
}
