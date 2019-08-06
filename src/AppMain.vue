<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
/**
 * What's inside the self-contained, dependent to vue-router.
 * In order to reproduce same effect in another project that imports
 * this as a starting point, you'll have to copy-paste and add your
 * own router-view instance.
 */

/** @type {import('vue').VueConstructor} */
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

