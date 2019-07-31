const getters = {
  sidebar: state => state.layout.sidebar,
  device: state => state.layout.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
