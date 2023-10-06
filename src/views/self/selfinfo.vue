<template>
  <div>
    <div>
      <p>用户名：{{ name }}</p>
      <p>用户id：{{ uid }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  name: "",
  uid: "",
  computed: {
    ...mapGetters(["name", "uid"]),
  },
};
</script>
