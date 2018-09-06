import request from '@/utils/request';

export function getList(params: any) {
  return request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
