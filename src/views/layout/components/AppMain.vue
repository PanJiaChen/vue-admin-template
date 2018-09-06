<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default class AppMain extends Vue {}
</script>

<style scoped>
.app-main {
  /* 50 = navbar */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}
</style>
