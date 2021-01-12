import { login, getInfo, ActiveRouter } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { resolve, reject } from 'core-js/fn/promise'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus: '',
    position: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar, position, roles } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_POSITION', position)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取路由表
  getActiveRouter({ commit, state }) {
    return new Promise((resolve, reject) => {
      ActiveRouter(state.token).then(response => {
        const list = response.data
        if (!list) {
          reject('验证失败，请重新登录')
        }
        const menus = list
        // console.log(menus)
        menus.push(
          {
            path: '/others',
            component: 'Layout',
            meta: {
              title: '其他事务',
              icon: 'el-icon-setting'
            },
            children: [
              {
                path: '/my',
                name: 'my_profile',
                component: 'users/my',
                meta: {
                  title: '个人中心',
                  icon: 'user'
                }
              }
            ]
          }, {
            path: '/404',
            component: '404',
            hidden: true
          }, {
            path: '*',
            redirect: '/404',
            hidden: true
          }, {
            path: '/emptyPage',
            component: 'emptyPage',
            hidden: true
          })
        commit('SET_MENUS', menus)
        resolve(list)
      }).catch(error => {
        console.log(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

