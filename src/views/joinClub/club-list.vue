<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="社团名称"
        style="width: 160px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="社团类型"
        clearable
        class="filter-item"
        style="width: 160px; margin-left: 10px"
      >
        <el-option
          v-for="item in clubTypes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        style="margin-left: 10px"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      style="margin-top: 15px; width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column label="社团名称" align="center">
        <!--  width="300px" -->
        <template slot-scope="{ row }">
          <span style="cursor: pointer" @click="handleClubNameClick(row)">{{
            row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="社团类型" prop="TYPE" align="center">
        <!--width="250px"!-->

        <template slot-scope="{ row }">
          <el-tag effect="dark" :type="showTypeTags(row.type)">{{
            row.type
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="社团人数" prop="memberCnt" align="center">
      </el-table-column>
      <!--           width="150px"-->

      <el-table-column label="创立时间" prop="createDate" align="center">
      </el-table-column>
      <!--        width="200px"-->

      <el-table-column label="现任负责人" prop="supervisorName" align="center">
        <!--        width="220px"-->
      </el-table-column>

      <el-table-column label="申请加入" align="center">
        <!--        width="220px"-->
        <template slot-scope="{ row }">
          <el-button
            :type="getButtonType(row.joinState)"
            :disabled="row.joinState !== 'no'"
            @click="apply(row)"
          >
            <span v-if="row.joinState === 'no'">申请加入</span>
            <span v-else-if="row.joinState === 'applying'">申请待审核</span>
            <span v-else>已加入</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from "@/api/news";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { join, getJoinState, getClubTypeList, fetchList } from "@/api/club";
import { mapGetters } from "vuex";
import { getCurTime } from "@/utils/timeFormat";

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  uid: "",
  computed: {
    ...mapGetters(["uid"]),
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        name: undefined,
        type: undefined,
        createDate: undefined,
        supervisorName: undefined,
        memberCnt: undefined,
        userId: undefined,
      },
      importanceOptions: [1, 2, 3],
      clubTypes: [],
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.listQuery.userId = this.uid;
    this.getList();
    this.getClubTypes();
  },
  methods: {
    getButtonType(joinState) {
      if (joinState === "joined") {
        return "success";
      } else if (joinState === "applying") {
        return "warning";
      } else {
        return "primary";
      }
    },
    getClubTypes() {
      getClubTypeList().then((res) => {
        this.clubTypes = res.data.type;
      });
    },
    handleClubNameClick(row) {
      console.log(row.id);
    },

    showTypeTags(type) {
      if (type === "学术科技类") {
        return "";
      } else if (type === "文化体育类") {
        return "success";
      } else if (type === "思想政治类") {
        return "danger";
      } else {
        return "warning";
      }
    },
    getList() {
      fetchList(this.listQuery).then(async (response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        console.log(this.list);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: "",
      };
    },

    apply(row) {
      this.$confirm("是否确定向 " + row.name + " 递交入社申请？", "申请确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          const applicant_id = this.uid;
          const club_id = row.id;
          const apply_time = getCurTime();
          const joinData = {
            applicant_id: applicant_id,
            club_id: club_id,
            apply_time: apply_time,
          };

          join(joinData)
            .then(() => {
              this.getList();
              this.$message({
                type: "success",
                message: "申请成功",
              });
            })
            .catch(() => {});
        })
        .catch((err) => {
          this.$message({
            type: err === "" ? "info" : "error",
            message: err === "" ? "取消申请" : err,
          });
        });
    },

    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status",
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
