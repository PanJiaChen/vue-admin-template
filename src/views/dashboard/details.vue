<template>
  <el-dialog
    :visible="visible"
    :title="details.title"
    width="80%"
    :center="true"
    @close="close"
    :close-on-press-escape="true"
  >
    <div>
      <p v-if="type === 'msg'">发布社团: {{ details.publishClub }}</p>
      <p>发布单位: {{ details.publisherDept }}</p>
      <p>发布者: {{ details.editorName }}</p>
      <p>发布时间: {{ details.time.replace("T", " ") }}</p>
      <el-divider></el-divider>
      <div
        class="news-content"
        v-html="details.content"
        style="font-size: 16px"
      ></div>
    </div>
  </el-dialog>
</template>
<script>
import { getNewsById } from "@/api/news";
import { getMsgById } from "@/api/msg";

export default {
  props: {
    id: Number,
    visible: Boolean,
    type: "",
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        // 当visible变为true时加载数据
        this.loadData(this.id, this.type);
      }
    },
  },
  data() {
    return {
      details: {
        title: "",
        content: "",
        time: "",
        publisherDept: "",
        editorName: "",
        publishClub: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    loadData(id, type) {
      if (type === "news") {
        getNewsById(id).then((res) => {
          this.details = res.data;
        });
      } else {
        getMsgById(id).then((res) => {
          this.details = res.data;
        });
      }
    },
  },
};
</script>

<style scoped>
.news-content {
  padding: 20px;
}
</style>
