import request from "@/utils/request";

export function getById(id) {
  return request({
    url: "/api/clubs/id",
    method: "get",
    params: { id: id },
  });
}

export function fetchList(query) {
  return request({
    url: "/api/clubs",
    method: "get",
    params: query,
  });
}

export function getJoinState(userId, clubId) {
  return request({
    url: "/api/clubs/user/state",
    method: "get",
    params: { userId: userId, clubId: clubId },
  });
}
export function postTest(data) {
  return request({
    url: "/api/clubs/test",
    method: "post",
    data,
  });
}

export function createClub(form) {
  return request({
    url: "/api/application/clubs/create",
    method: "post",
    data: form,
  });
}

export function getClubTypeList() {
  return request({
    url: "/api/clubs/types",
    method: "get",
  });
}

export function join(data) {
  return request({
    url: "/api/application/clubs/join",
    method: "post",
    data,
  });
}

export function deleted(data) {
  return request({
    url: "/api/application",
    method: "post",
    data,
  });
}
