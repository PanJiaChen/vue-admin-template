<template>
  <div :class="classObj">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapsed"
        key="collapsed"
        class="sidebar-logo-router-link"
        to="/"
      >
        <img v-if="hasLogoUrl" :src="logoUrl">
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-router-link" to="/">
        <img v-if="hasLogoUrl" :src="logoUrl">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
/** @type {import('vue').VueConstructor} */
export default {
  name: 'SidebarLogo',

  props: {
    title: {
      type: String,
      default: 'Vue Admin Template'
    },
    logoUrl: {
      type: String,
      default:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },

  inject: ['layout'],

  computed: {
    hasLogoUrl() {
      const hasLogoUrl = String(this.logoUrl).length > 1
      return hasLogoUrl
    },

    collapsed() {
      const sidebarCollapsed = this.layout.sidebarCollapsed
      return sidebarCollapsed
    },

    classObj() {
      const collapsed = this.collapsed
      const hasLogo = this.hasLogo

      return {
        'layout-sidebar-logo--component': true,
        'is-collapsed': collapsed,
        'has-logo': hasLogo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.layout-sidebar-logo--component {
  position: relative;
  width: 100%;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-router-link {
    height: 100%;
    width: 100%;

    & img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // &.is-collapsed {
  //   img {
  //     margin-right: 0px;
  //   }
  // }
}
</style>
