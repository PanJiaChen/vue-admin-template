<template>
  <div :class="classObj" :data-logo-url="logoUrl">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
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
    collapse: {
      type: Boolean,
      required: true
    },
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
  computed: {
    hasLogoUrl() {
      const hasLogo = String(this.logoUrl).length > 1
      return hasLogo
    },
    imageData() {
      if (this.hasLogoUrl) {
        const logoUrl = this.logoUrl
        return import(logoUrl)
      }

      return {
        render(
          /** @type {import('vue').CreateElement} */
          h,
        ) {
          return h('span', ['<!-- No logoUrl -->'])
        }
      }
    },
    classObj() {
      const collapsed = this.collapse === true
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
  height: 50px;
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

  &.is-collapsed {
    img {
      margin-right: 0px;
    }
  }
}
</style>
