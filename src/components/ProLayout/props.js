export const sidebarProps = {
  collapsed: {
    type: Boolean,
    default: () => []
  },
  menus: {
    type: Array,
    default: () => []
  },
  showLogo: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Vue Admin Template'
  },
  logo: {
    type: String,
    default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
  }
}

export const proLayoutProps = {
  ...sidebarProps,
  handleCollapse: {
    type: Function,
    default: () => () => {}
  },
  withoutAnimation: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  fixedHeader: {
    type: Boolean,
    default: false
  },
  handleMediaQuery: {
    type: Function,
    default: () => () => {}
  }

}
