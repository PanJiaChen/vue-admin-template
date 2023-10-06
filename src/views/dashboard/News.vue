<template>
  <div style="text-align: center">
    <h2>新闻</h2>
    <div style="margin: 0 5% 5% 5%">
      <el-table
        :data="tableData"
        style="width: 150%; margin-top: 39px"
        :show-header="false"
        @cell-click="handleCellClick"
      >
        <el-table-column prop="date" width="180">
          <template v-slot="scope">
            <div class="tag-container">
              <el-tag effect="dark" class="myel-tag">{{
                formatDate(scope.row.time, "day")
              }}</el-tag>
              <el-tag effect="dark" type="danger" class="myel-tag-month">{{
                formatDate(scope.row.time, "year-month")
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title">
          <template slot-scope="scope">
            <div class="title-cell">
              <span class="title-text">{{ scope.row.title }}</span>
              <span class="department-text">{{ scope.row.publisherDept }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>
    <news_details
      :visible.sync="this.showDetailsDialog"
      :id="this.clickItem.id"
      @close="closeDetailsDialog"
      :type="this.type"
    ></news_details>
  </div>
</template>

<script>
import news_details from "@/views/dashboard/details.vue";
import { listNews } from "@/api/news";
export default {
  components: {
    news_details,
  },
  data() {
    return {
      type: "news",
      currentPage: 1,
      pageSize: 6,
      total: 0,
      totalPage: 0,
      tableData: [{}],
      showDetailsDialog: false,
      clickItem: {
        id: Number,
      },
    };
  },
  methods: {
    handleCellClick(row, column, cell, event) {
      if (column.property === "title") {
        this.showDetailsDialog = true;
        console.log(this.showDetailsDialog);
        this.clickItem.id = row.id;
      }
    },

    closeDetailsDialog() {
      // 当 Dialog 关闭时，重置 isDetailsVisible
      this.showDetailsDialog = false;
    },
    loadData(page, limit) {
      listNews(page, limit).then((res) => {
        this.tableData = res.data.items;
        this.total = res.data.total;
        this.totalPage = res.data.page;
      });
    },
    formatDate(dateTimeString, format) {
      const dateObj = new Date(dateTimeString);
      if (isNaN(dateObj.getTime())) {
        return "";
      }

      switch (format) {
        case "day":
          const day = dateObj.getDate();
          return `${day < 10 ? "0" : ""}${day}`;
        case "year-month":
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          return `${year}-${month < 10 ? "0" : ""}${month}`;
        default:
          return "";
      }
    },
    handleCurrentChange(val) {
      this.loadData(this.currentPage, this.pageSize);
    },
  },
  created() {
    this.loadData(this.currentPage, this.pageSize);
  },
};
</script>

<style>
.title-cell {
  display: flex;
  flex-direction: column;
}

.title-text {
  color: black; /* 标题文字颜色 */
  font-size: 16px; /* 标题文字大小 */
  margin-bottom: 4px; /* 标题与部门之间的间距 */
  cursor: pointer; /*鼠标移上去时变成可点击指针*/
}

.department-text {
  color: rgb(128, 128, 128); /* 部门文字颜色 */
  font-size: 14px; /* 部门文字大小 */
}

.tag-container {
  display: flex;
  flex-direction: column;
}
.myel-tag {
  width: 100px;
  height: 40px; /* 第一个 el-tag 尺寸为 100x40 */
  line-height: 40px; /* 垂直居中 */
  text-align: center; /* 水平居中 */
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 2px; /* 垂直间距 */
  display: flex;
  justify-content: center;
}
.myel-tag-month {
  width: 100px;
  height: 30px; /* 第一个 el-tag 尺寸为 100x40 */
  line-height: 30px; /* 垂直居中 */
  text-align: center; /* 水平居中 */
  font-size: 15px;
  font-weight: bold;
}
</style>
