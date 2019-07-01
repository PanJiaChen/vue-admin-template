<template>
  <div class="crumbar">
    <breadcrumb class="breadcrumb-container" />
    <div class="right-name">{{ siteName }}</div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {
    siteName() {
      return this.$store.state.app.siteName
    }
  }
}
</script>

<style lang="scss" scoped>
.crumbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-name {
    float: right;
    height: 100%;
    line-height: 50px;
  }
}
</style>
