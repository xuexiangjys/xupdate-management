import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

export function getAccounts() {
  return request({
    url: '/account/accounts',
    method: 'get'
  })
}

export function getPagingAccounts(data) {
  return request({
    url: '/account/accountPageQuery',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/account/register',
    method: 'post',
    data
  })
}

export function deleteAccount(data) {
  return request({
    url: '/account/delete',
    method: 'post',
    data
  })
}

export function updateAccount(data) {
  return request({
    url: '/account/updateInfo',
    method: 'post',
    data
  })
}