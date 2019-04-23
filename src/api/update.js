import request from '@/utils/request'

export function getVersions() {
  return request({
    url: '/update/versions',
    method: 'get'
  })
}

