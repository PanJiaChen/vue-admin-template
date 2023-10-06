import request from "@/utils/request";

export function listMsg(id, page, limit) {
  return request({
    url: "/api/message/club",
    method: "get",
    params: { club_id: id, page: page, limit: limit },
  });
}

export function getMsgById(id) {
  return request({
    url: "/api/message",
    method: "get",
    params: { id: id },
  });
}
