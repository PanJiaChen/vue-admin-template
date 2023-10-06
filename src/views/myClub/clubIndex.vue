<template>
  <div>
    <p>您的身份组是：{{ club.role }}</p>
    <p>社团详情：{{ club }}</p>
  </div>
</template>

<script>
export default {
  props: {
    club: "",
  },
};
</script>

<style scoped></style>
