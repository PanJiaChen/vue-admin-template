<template>
  <div ref="navbar" class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div ref="msg_popover" class="right-menu">
      <!-- <div ref="msg_popover"> -->
      <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <el-popover :popper-class="device=='mobile'?'popover_mobile':'popover'" placement="bottom-end" trigger="manual" title="消息提醒" :value="popover_visible" :width="device==='mobile'?width-50:''" :popper-options="{ boundariesElement: 'body', priority:['right','left','bottom','top'], width:'80vh'}">
        <li v-for="tag in messages" :key="tag.message_id" style="cursor: pointer; margin-bottom:5px" @click="route_to(tag.url)">{{ tag.msg + '  ' + tag.timestamp }}</li>
        <el-button type="text" icon="el-icon-delete" @click="clear_message">清空消息</el-button>
        <el-badge slot="reference" :value="nums" class="badge right-menu-item hover-effect">
          <el-button type="info" icon="el-icon-message" circle size="small" plain @click="popover_visible = !popover_visible" />
        </el-badge>
      </el-popover>
      <!-- </div> -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/my">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { query_msg, clear_msg } from '@/api/user'
import Push from 'push.js'
import Cookies from 'js-cookie'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      messages: [],
      nums: 0,
      timer: null,
      width: document.documentElement.clientWidth,
      popover_visible: false
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    avatar() {
      return process.env.VUE_APP_BASE_API + this.$store.state.user.avatar
    },
    name() {
      return this.$store.state.user.name
    },
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    this.getMessage()
    this.timer = window.setInterval(() => {
      this.getMessage()
    }, 600000)
    window.onresize = () => {
      return (() => {
        this.width = document.documentElement.clientWidth
      })()
    }
    document.addEventListener('click', (e) => {
      if (this.$refs['msg_popover']) {
        if (!this.$refs['msg_popover'].contains(e.target)) {
          this.popover_visible = false
        }
      }
    })
  },
  destroyed() {
    window.clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    route_to(url) {
      this.$router.push({ path: url })
      this.popover_visible = false
    },
    notify(item) {
      const that = this
      Push.create('新消息', {
        body: item.msg + '-' + item.timestamp,
        tag: item.url,
        requireInteraction: true,
        // timeout: 60000,
        // icon: './favicon.ico',
        // action: [],
        onClick: function() {
          window.focus()
          this.close()
          that.$router.push(this.tag)
        }
      })
    },
    getMessage() {
      query_msg({ name: this.name })
        .then((res) => {
          this.messages = res.data
          if (Cookies.get('Version') !== res.version) {
            this.$message.success('系统版本更新')
            Cookies.set('Version', res.version)
            location.reload()
          }
          this.nums = this.messages.length
          this.messages.forEach((item) => {
            this.notify(item)
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取新提醒失败')
        })
    },
    clear_message() {
      clear_msg({ name: this.name })
        .then(() => {
          Push.clear()
          this.getMessage()
          this.$message.success('清空消息成功')
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('删除消息提醒失败')
        })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style>
  .popover_mobile {
    height: 80vh;
    overflow: auto;
    margin-right:-50px;
  }
  .popover {
    overflow: auto;
    height: 60vh;
  }
</style>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 50px;
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
    .el-badge {
      ::v-deep .el-badge__content{
        position: relative;
        right:30px
      }
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
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
