<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { proLayoutPrefix } from './variables.scss'

export default {
  name: 'ProLayout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  props: {
    title: {
      type: String,
      default: 'Vue Admin Template'
    },
    logo: {
      type: String,
      default: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    },
    menus: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: () => []
    },
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
    },
    showLogo: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      title: this.title,
      logo: this.logo,
      menus: this.menus,
      isMobile: this.isMobile,
      collapsed: this.collapsed,
      handleCollapse: this.handleCollapse,
      showLogo: this.showLogo
    }
  },
  computed: {
    classObj() {
      return {
        hideSidebar: this.collapsed,
        openSidebar: !this.collapsed,
        withoutAnimation: this.withoutAnimation,
        mobile: this.isMobile,
        [`${proLayoutPrefix}-app-wrapper`]: true
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.handleCollapse && this.handleCollapse({ withoutAnimation: false })
    }
  },
  render() {
    const { classObj, isMobile, collapsed, handleClickOutside, fixedHeader, $scopedSlots, $props } = this

    return (
      <div class={classObj}>
        {(isMobile && !collapsed) && <div class='drawer-bg' onClick={handleClickOutside} />}
        <sidebar class='sidebar-container' props={$props}/>
        <div class='main-container'>
          <div class={{ 'fixed-header': fixedHeader }}>
            {$scopedSlots.headerRender
              ? ($scopedSlots.headerRender)
              : (<navbar scopedSlots={$scopedSlots}></navbar>)}
          </div>
          <app-main>{$scopedSlots.default}</app-main>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  @import "./variables.scss";

  .#{$proLayoutPrefix}-app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }

    .drawer-bg {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }

    &.hideSidebar .fixed-header {
      width: calc(100% - 54px)
    }

    &.mobile .fixed-header {
      width: 100%;
    }
  }
</style>
