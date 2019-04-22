const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name
}
export default getters
