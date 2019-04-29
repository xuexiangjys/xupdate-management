const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  isFirstRun: state => state.app.isFirstRun,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  token: state => state.account.token,
  avatar: state => state.account.avatar,
  name: state => state.account.name
}
export default getters
