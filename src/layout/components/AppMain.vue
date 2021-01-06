<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 增加tagview -->
      <!-- <router-view :key="key" /> -->
      <!-- <keep-alive :include="cachedViews"> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
      </keep-alive>
    </transition>
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // 增加tagviews
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
  // mounted() {
  //   console.log(this.cachedViews)
  // }
}
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 84px);
  // max-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 84px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
