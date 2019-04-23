
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const accounts = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nick: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    nick: 'Normal Editor'
  }
}

export default [
  // account login
  {
    url: '/account/login',
    type: 'post',
    response: config => {
      const { loginName } = config.body
      const token = tokens[loginName]

      // mock error
      if (!token) {
        return {
          code: 60204,
          msg: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        data: token
      }
    }
  },

  // get account info
  {
    url: '/account/info',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = accounts[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          msg: 'Login failed, unable to get account details.'
        }
      }

      return {
        code: 0,
        data: info
      }
    }
  },

  // account logout
  {
    url: '/account/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
