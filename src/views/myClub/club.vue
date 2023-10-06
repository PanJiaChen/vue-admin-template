<template>
  <div style="position: relative">
    <el-tabs>
      <el-tab-pane>
        <span slot="label"><svg-icon icon-class="sector" /> 社团主页</span>
        <ClubIndex :club="club"></ClubIndex>
      </el-tab-pane>
      <el-tab-pane v-if="club.role !== 'STUDENT'">
        <span slot="label"><svg-icon icon-class="manager" /> 社团管理</span>
        <manage :club="club"></manage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import News from "@/views/dashboard/News.vue";
import ClubIndex from "@/views/myClub/clubIndex.vue";
import Manage from "@/views/myClub/manage.vue";

export default {
  components: { Manage, ClubIndex, News },
  props: {
    club: "",
  },
};
</script>
