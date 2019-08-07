<template>
  <div :class="classObj" class="layout-navbar--component">
    <div class="navbar-left">
      <div class="navbar-left-item">
        <layout-hamburger />
      </div>
      <slot name="navbarLeft">
        <div class="navbar-left-item navbar-breadcrumb-parent">
          <layout-breadcrumb />
        </div>
      </slot>
    </div>

    <div class="navbar-right">
      <el-dropdown class="avatar-container navbar-right-item" trigger="click">
        <div class="avatar-container">
          <component :is="avatarSlot.is" :key="avatarSlot.key">
            <img v-if="hasAvatarImage" :src="avatarImage" class="user-avatar">
          </component>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <component :is="avatarDropdownSlot.is" :key="avatarDropdownSlot.key">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
          </component>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="layout.$emit('logout')"
            >Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import LayoutBreadcrumb from './Breadcrumb.vue'
import LayoutHamburger from './Hamburger.vue'
import { LayoutDependent } from '../mixins'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutNavbar',

  components: {
    LayoutBreadcrumb,
    LayoutHamburger
  },

  mixins: [LayoutDependent],

  computed: {
    avatarSlot() {
      // rel=#UpdatingLocalSlot Method 2
      const name = 'avatar'
      const slot = this.createComponentDefinition(name)
      return slot
    },

    avatarDropdownSlot() {
      // rel=#UpdatingLocalSlot Method 2
      const name = 'avatarDropdown'
      const slot = this.createComponentDefinition(name)
      return slot
    },

    userSessionBox() {
      const { avatar = '', name = '' } = this.layout.navbarUserSessionBox
      return {
        avatar,
        name
      }
    },

    fixedHeader() {
      const fixedHeader = this.layout.fixedHeader
      return fixedHeader
    },

    sidebarOpened() {
      const sidebarOpened = this.layout.sidebarOpened
      return sidebarOpened
    },

    hasAvatarImage() {
      return String(this.userSessionBox.avatar).length > 1
    },

    avatarImage() {
      const hasBaseUrl = String(this.userSessionBox.avatar).length > 1
      if (!hasBaseUrl) {
        return ''
      }
      return this.userSessionBox.avatar
    },

    classObj() {
      const fixedHeader = this.fixedHeader
      const sidebarOpened = this.sidebarOpened
      const classMap = {
        'is-layout-navbar-sidebar-opened': sidebarOpened,
        'is-layout-navbar-fixed': fixedHeader,
        'layout-navbar': true
      }
      return classMap
    }
  },

  methods: {
    slotMountAll() {
      // rel=#UpdatingLocalSlot Method 1
      this.slotMount('navbarLeft', 'navbarLeft')
    }
  }
}
</script>

<style lang="scss">
.layout-navbar--component {

  .navbar-left {
    float: left;

    .navbar-left-item {
      display: inline-block;
    }

    /**
     * Notice we're not overriding layout-breadcrumb
     * But rather adjust it to suit WHEN USED AS PART of the Navbar
     *
     * NOTE: It would be best to NOT use padding as way of aligning.
     */
    .navbar-breadcrumb-parent {
      padding: 18px 0px;
    }
  }

  .navbar-right {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .navbar-right-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.layout-navbar--component {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.is-layout-navbar-fixed {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
    width: 100%;
  }

  .navbar-right {

    .avatar-container {
      margin-right: 30px;

      .avatar-container {
        margin-top: 5px;
        position: relative;

        img.user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
