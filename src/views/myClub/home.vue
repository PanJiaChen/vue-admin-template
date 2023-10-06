<template>
  <div>
    <el-empty
      v-if="clubs.length === 0"
      :image-size="400"
      description="您还没有加入社团"
    >
      <el-button type="primary" @click="navigateToJoinClubList"
        >去加入社团</el-button
      >
    </el-empty>
    <el-container v-else>
      <el-aside width="200px">
        <el-menu
          style="height: 100%"
          :default-active="clubs[0].clubId"
          @select="handleMenuSelect"
        >
          <el-menu-item
            v-for="club in clubs"
            :key="club.clubId"
            :index="club.clubId"
          >
            <span slot="title">{{ club.clubName }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <club :club="club"></club>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import club from "@/views/myClub/club.vue";
import News from "@/views/dashboard/News.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    News,
    club,
  },
  clubs: "",
  computed: {
    ...mapGetters(["clubs"]),
  },
  data() {
    return {
      club: "",
    };
  },
  created() {
    this.handleMenuSelect(this.clubs[0].clubId);
    console.log(this.clubs.length);
  },
  methods: {
    navigateToJoinClubList() {
      this.$router.push("/joinClub/list"); // 执行路由导航
    },
    handleMenuSelect(index) {
      this.club = this.clubs.find((club) => club.clubId === index);
      console.log(this.club.role);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0; /*外部间距也是如此设置*/
  margin: 0; /*统一设置高度为100%*/
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 60px !important;
}
/*找到html标签、body标签，和挂载的标签都给他们统一设置样式
*/
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
