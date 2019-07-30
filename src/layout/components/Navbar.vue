<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebarOpened"
      class="hamburger-container"
      @layout-hamburger-click="$emit('layout-hamburger-click')"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <slot name="avatar">
            <img
              v-if="avatarImage !== ''"
              :src="avatarImage"
              class="user-avatar"
            >
          </slot>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/#/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="$emit('logout')">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

/** @type {import('vue').VueConstructor} */
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  props: {
    sidebarOpened: {
      type: Boolean,
      default: true
    },
    avatarImageBaseUrl: {
      type: String,
      default: ''
    },
    avatarImageViewQueryParam: {
      type: String,
      default: 'imageView2/1/w/80/h/80'
    }
  },
  computed: {
    avatarImage() {
      const hasBaseUrl = String(this.avatarImageBaseUrl).length > 1
      const hasAvatarImageViewQueryParam =
        String(this.avatarImageViewQueryParam).length > 1
      if (!hasBaseUrl) {
        return ''
      }
      const baseUrl = this.avatarImageBaseUrl
      const queryParams = hasAvatarImageViewQueryParam
        ? '?' + this.avatarImageViewQueryParam
        : ''
      const src = `${baseUrl}${queryParams}`
      return src
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
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

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
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
