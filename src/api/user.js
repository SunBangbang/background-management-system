import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mgr/WeBASE-Node-Manager/account/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'HttpURL',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: 'HttpURL',
    method: 'post'
  })
}
