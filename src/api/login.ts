import request from '@/utils/request';

export function login(username: string, password: string) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });
}

export function getInfo(token: string) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token },
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  });
}
