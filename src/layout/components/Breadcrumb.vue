<template>
  <el-breadcrumb class="layout-breadcrumb--component" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

/** @type {import('vue').VueConstructor} */
export default {
  name: 'LayoutBreadcrumb',

  data() {
    return {
      levelList: null,
      hasRouter: false,
      hasRoute: false
    }
  },

  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },

  created() {
    this.getBreadcrumb()
  },

  beforeMount() {
    this.hasRouter = '$router' in this
    this.hasRoute = '$route' in this
  },

  methods: {
    getBreadcrumb() {
      const route = this.hasRoute ? this.$route : { matched: [] }
      // only show routes with meta.title
      let matched = route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },

    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },

    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params = {}} = this.routeFound ? this.$route : { }
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },

    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb--component.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
