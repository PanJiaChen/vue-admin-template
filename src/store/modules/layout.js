import Cookies from 'js-cookie'
import { fixedHeader } from '@/settings'

// Foo
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  rightPanel: {
    opened: false
  },
  navbar: {
    fixed: fixedHeader
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    const { opened = false } = state.sidebar
    state.sidebar.opened = !opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  TOGGLE_RIGHT_PANEL: state => {
    const { opened = false } = state.rightPanel
    state.rightPanel.opened = !opened
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  RIGHT_PANEL_OPENED(state, opened) {
    state.rightPanel.opened = opened
  },
  SIDEBAR_OPENED(state, opened) {
    state.sidebar.opened = opened
  },
  NAVBAR_FIXED(state, fixed) {
    state.navbar.fixed = fixed
  }
}

const actions = {
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  toggleRightPanel({ commit }) {
    commit('TOGGLE_RIGHT_PANEL')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
