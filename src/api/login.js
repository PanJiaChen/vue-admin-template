import fetch from '@/utils/fetch';

export function login(email, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      email,
      password
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  });
}



