<template>
  <div class="app-container">
    <el-col :span="24">
      <el-table :data="roleData" style="width: 100%">
        <el-table-column label="角色名称" prop="role" min-width="140">
        </el-table-column>
        <el-table-column align="right" min-width="140">
          <template slot-scope="scope">
            <el-col :span="12"
              ><el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >新增</el-button
              ></el-col
            >
            <el-col :span="12">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align: center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getRoleList } from "@/api/role";
export default {
  data() {
    return {
      total: 0,
      pageSize: 10,
      currentPage: 1,
      roleData: [],
      form: {},
    };
  },
  created() {
    this.initData(this.currentPage, this.pageSize);
  },
  methods: {
    initData(page, limit) {
      let query = { page: page, limit: limit };
      getRoleList(query).then((res) => {
        let { data } = res;
        this.roleData = data.results;
        this.total = data.total;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.initData(this.currentPage, val);
    },
    handleCurrentChange(val) {
      this.initData(val, this.pageSize);
    },
  },
};
</script>

<style scoped>
</style>

