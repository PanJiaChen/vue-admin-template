<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="申请类型"
        style="width: 160px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="申请状态"
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
      <el-table-column label="申请编号" width="100%" prop="id" align="center">
      </el-table-column>
      <el-table-column label="申请内容" align="center" width="300%">
        <template v-slot="{ row }" style="text-align: center">
          <p v-if="row.type === 'JOIN_CLUB'">
            申请加入社团「{{ row.club_name }}」
          </p>
          <p v-else-if="row.type === 'CLUB_CREATE'">
            申请创建社团「{{ row.application_detail.name }}」
          </p>
          <p v-else-if="row.type === 'CLUB_SHUTDOWN'">
            申请撤销社团「{{ row.application_detail.name }}」
          </p>
          <p v-else-if="row.type === 'ACTIVITY'">
            社团「{{ row.club_name }}」申请举行活动「{{
              row.application_detail.activity_name
            }}」
          </p>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" prop="apply_time" align="center">
      </el-table-column>

      <el-table-column label="当前申请状态" prop="TYPE" align="center">
        <template v-slot="{ row }">
          <el-tag effect="dark" :type="showTypeTags(row.status)">
            <span v-if="row.status === 'REJECTED'">申请被驳回</span>
            <span v-else-if="row.status === 'PENDING'">申请待审核</span>
            <span v-else>申请已通过</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button
            v-if="row.status !== 'REJECTED'"
            type="danger"
            icon="el-icon-circle-close"
            @click="handleCancelApply(row)"
          >
            取消申请
          </el-button>
          <el-button v-else type="info" :disabled="true">
            已不可取消
          </el-button>
        </template>
      </el-table-column>

      <div slot="empty" style="text-align: left">
        <el-empty description="您还没有提交过申请" />
      </div>
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
import { cancelApply, getApplyList } from "@/api/apply";

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
        id: undefined,
        page: 1,
        limit: 20,
        application_detail: undefined,
        reviewer_id: undefined,
        review_time: undefined,
        apply_time: undefined,
        status: undefined,
        club_id: undefined,
        applicant_id: undefined,
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
    handleClubNameClick(row) {
      console.log(row.id);
    },
    showTypeTags(type) {
      if (type === "PENDING") {
        return "warning";
      } else if (type === "REJECTED") {
        return "danger";
      } else {
        return "success";
      }
    },

    getList() {
      getApplyList(this.listQuery).then((res) => {
        this.list = res.data.items;
        this.total = res.data.total;
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

    handleCancelApply(row) {
      this.$confirm("是否确定撤销该申请？", "撤销申请确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelApply(row.id).then((res) => {
            this.$message({
              message: "取消申请成功！",
              type: "success",
            });

            setTimeout(() => {
              window.location.reload();
            }, 200);
          });
        })
        .catch(() => {
          setTimeout(() => {
            window.location.reload();
          });
        });
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
