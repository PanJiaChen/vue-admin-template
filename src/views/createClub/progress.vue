<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="申请id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="applicant_id"
        label="申请者id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="申请时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Status"
        label="申请状态">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">取消</el-button>
      </template>
    </el-table-column>
    </el-table>

</template>
<script>
export default {
    data() {
        return {
          tableData: [{
            id: '1',
            applicant_id: '2220202389',
            apply_time: '2023-9-27',
            Status:'待批准'
          }]
        }
      },
      methods:{
        
      }
}

</script>
