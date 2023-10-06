import request from "@/utils/request";
export function getApplyList(data) {
  return request({
    url: "/api/application/user",
    method: "get",
    params: data,
  });
}

export function cancelApply(id) {
  return request({
    url: "/api/application",
    method: "DELETE",
    data: { id: id },
  });
}
