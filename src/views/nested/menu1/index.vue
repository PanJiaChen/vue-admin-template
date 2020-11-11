<template>
  <div class="app-container accounts">
    <div class="territory-container">
      <div class="territory-title">账号管理</div>
      <el-input
        v-model="title"
        placeholder="请输入关键字查询"
        style="width: 400px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>
    <div class="operation">
      <div class="operation-left">
        <el-button type="danger">删除</el-button>
        <el-button type="success">添加</el-button>
      </div>
      <div class="operation-right">
        <el-button type="warning">生成Excel</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ADuser" width="120" align="center">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center" />
      <el-table-column prop="name" label="性别" width="120" align="center" />
      <el-table-column
        prop="name"
        label="账号名称"
        width="120"
        align="center"
      />
      <el-table-column
        prop="name"
        label="电子邮箱"
        width="120"
        align="center"
      />
      <el-table-column
        prop="name"
        label="所属支行"
        width="120"
        align="center"
      />
      <el-table-column
        prop="address"
        label="账号状态"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="form" :inline="true">
        <el-form-item label="账号名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="银行:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="ADuser:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="修改" />
            <el-radio label="不修改" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="姓　　名:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮　　箱:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="账号状态:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号角色:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio label="超级管理者" />
            <el-radio label="管理员" />
            <el-radio label="审核员" />
            <el-radio label="客户经理" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      title: '',
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        date: undefined,
        sort: '+id'
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleFilter() {
      // this.getList()
      console.log('正在查询了，别催！')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true
      console.log(index, row)
    }
  }
}
</script>
