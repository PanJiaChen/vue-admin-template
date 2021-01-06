<template>
  <div />
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.fullPath)
    })
  },
  mounted() {
  }
}
</script>

<style>

</style>
