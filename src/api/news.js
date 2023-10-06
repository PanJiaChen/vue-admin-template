import request from "@/utils/request";

export function listNews(page, limit) {
  return request({
    url: "/api/news",
    method: "get",
    params: { page: page, limit: limit },
  });
}

export function getNewsById(id) {
  return request({
    url: "/api/news/id",
    method: "get",
    params: { id: id },
  });
}

export function fetchapply(query) {
  return request({
    url: "/api/application/user",
    method: "get",
    params: query,
  });
}

export function applymanage(query) {
  return request({
    url: "/api/application/admin",
    method: "get",
    params: query,
  });
}

export function getinfo(query) {
  return request({
    url: "/api/user/info",
    method: "get",
    params: query,
  });
}

export function fetchArticle(id) {
  return request({
    url: "/vue-admin-template-master/article/detail",
    method: "get",
    params: { id },
  });
}

export function fetchPv(pv) {
  return request({
    url: "/vue-admin-template-master/article/pv",
    method: "get",
    params: { pv },
  });
}

export function createArticle(data) {
  return request({
    url: "/vue-admin-template-master/article/create",
    method: "post",
    data,
  });
}

export function updateArticle(data) {
  return request({
    url: "/vue-admin-template-master/article/update",
    method: "post",
    data,
  });
}
export function createclub(data) {
  return request({
    url: "/api/application/create",
    method: "post",
    data,
  });
}
