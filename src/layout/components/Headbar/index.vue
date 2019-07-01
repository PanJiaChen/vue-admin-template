<template>
  <div v-if="showLogo" :class="{'has-logo':showLogo}">
    <logo :collapse="isCollapse" />
    <navtip />
  </div>
</template>

<script>
import Logo from './Logo'
import Navtip from './Navtip'

export default {
  components: { Logo, Navtip },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    }
  }
}
</script>
