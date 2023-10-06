<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ greetingMessage }}</div>
    <el-card
      class="box-card"
      shadow="hover"
      style="
        width: 48%;
        margin-left: 1%;
        margin-right: 1%;
        margin-top: 2%;
        float: left;
      "
    >
      <news></news>
    </el-card>
    <el-card
      class="box-card"
      shadow="hover"
      style="
        width: 48%;
        margin-left: 1%;
        margin-right: 1%;
        margin-top: 2%;
        float: left;
      "
    >
      <Push></Push>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import News from "./News.vue";
import Push from "./message.vue";

export default {
  components: { News, Push },
  name: "",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      greetingMessage: "",
    };
  },

  methods: {
    updateGreetingMessage() {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 5 && currentHour < 8) {
        this.greetingMessage = `${this.name}，清晨好！`;
      } else if (currentHour >= 8 && currentHour < 12) {
        this.greetingMessage = `${this.name}，上午好！`;
      } else if (currentHour >= 12 && currentHour < 14) {
        this.greetingMessage = `${this.name}，中午好！`;
      } else if (currentHour >= 14 && currentHour < 18) {
        this.greetingMessage = `${this.name}，下午好！`;
      } else {
        this.greetingMessage = `${this.name}，晚上好！`;
      }
    },
  },

  created() {
    this.updateGreetingMessage();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box {
  width: 48%;
  margin-left: 1%;
  margin-right: 1%;
  float: left;
  border: 2px solid #000;
  background-color: antiquewhite;
  // text-indent: 2cm;
  border-radius: 15px;
}
</style>
