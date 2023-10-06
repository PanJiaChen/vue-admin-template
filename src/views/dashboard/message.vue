<template>
  <div style="text-align: center">
    <h2>社团推送</h2>
    <el-empty v-if="clubs.length === 0" :image-size="400">
      <span slot="description">
        <template>
          <p>您还没有加入社团</p>
          <p>社团推送将在您加入社团后展示</p>
        </template>
      </span>
      <el-button type="primary" @click="navigateToJoinClubList"
        >去加入社团</el-button
      >
    </el-empty>
    <template v-else>
      选择社团
      <el-select v-model="value" placeholder="请选择" @change="handleChange">
        <el-option
          v-for="item in clubs"
          :key="item.clubId"
          :label="item.clubName"
          :value="item.clubId"
        >
        </el-option>
      </el-select>

      <!--  推送展示表格    -->
      <div style="margin-top: 10px">
        <el-table
          :data="tableData"
          style="width: 150%"
          :show-header="false"
          @cell-click="handleCellClick"
        >
          <el-table-column prop="date" width="180">
            <template slot-scope="scope">
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
                <span class="department-text">{{
                  scope.row.publisherDept
                }}</span>
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
      <msg_details
        :visible.sync="this.showDetailsDialog"
        :id="this.clickItem.id"
        @close="closeDetailsDialog"
        :type="'msg'"
      ></msg_details>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getById } from "@/api/club";
import { listMsg } from "@/api/msg";
import msg_details from "@/views/dashboard/details.vue";

export default {
  components: { msg_details },
  clubs: [],
  computed: {
    ...mapGetters(["clubs"]),
  },

  mounted() {
    if (this.clubs.length > 0) {
      this.value = this.clubs[0].clubId;
      this.handleChange();
    }
  },

  created() {
    if (this.clubs.length === 0) {
    } else {
    }
  },
  methods: {
    navigateToJoinClubList() {
      this.$router.push("/joinClub/list"); // 执行路由导航
    },
    handleChange() {
      listMsg(this.value, this.currentPage, this.pageSize).then((res) => {
        this.tableData = res.data.items;
        this.total = res.data.total;
        this.totalPage = res.data.page;
      });
    },
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
    handleCurrentChange() {
      this.handleChange();
    },
  },

  data() {
    return {
      value: "",
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
};
</script>

<style>
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
