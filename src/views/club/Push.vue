<template>
    <div>
        <h2>推送</h2>
        <div style="margin:0 5% 5% 5%">
      <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="80"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    </div>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>