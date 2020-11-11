<template>
  <div class="app-container">
    <div class="territory-container">
      <div class="territory-title">待审核信息</div>
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
    <div class="filter-container">
      <div class="filter-box">
        <span>姓名：</span>
        <el-input
          v-model="listQuery.title"
          placeholder="Title"
          style="width: 100px"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <div class="filter-box">
        <span>性别：</span>
        <el-select
          v-model="listQuery.sort"
          style="width: 90px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sexOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </div>
      <div class="filter-box">
        <span>身份证号：</span>
        <el-select
          v-model="listQuery.sort"
          style="width: 90px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in prepaidOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </div>
      <div class="filter-box">
        <span>申请原因：</span>
        <el-select
          v-model="listQuery.sort"
          style="width: 90px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in applyOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </div>

      <div class="filter-box">
        <span>上传时间：</span>
        <el-date-picker
          v-model="listQuery.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          size="small"
          style="width: 300px"
        />
      </div>
      <div class="filter-box">
        <span>客户经理：</span>
        <el-select
          v-model="listQuery.sort"
          style="width: 120px"
          class="filter-item"
          @change="handleFilter"
        >
          <el-option
            v-for="item in customerOptions"
            :key="item.key"
            :label="item.label"
            :value="item.key"
          />
        </el-select>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      :span-method="objectSpanMethod"
    >
      <!-- <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      type="index"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
    > -->
      <!-- <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ scope.row.author }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="姓名" width="100">
        <template slot-scope="scope" class="ssss">
          <span style="display: grid; grid-template-columns: 1fr 1fr 1.7fr 1fr">
            <span style="padding-right: 10px;">{{ scope.row.author }} </span>
            <span style="padding-left: 10px;padding-right: 10px;">{{ scope.row.author }} </span>
            <span style="padding-left: 10px;padding-right: 10px;"> 460030199601255434 </span>
            <span style="padding-left: 10px;">{{ scope.row.pageviews }} </span>
          </span>
          <span style="font-size: 12px;color: red;position: absolute;bottom: 5px;left: 20px;">*备注：此客户在一个月内已申请，请点击:www.hhhhhh.com 查看结果</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }} </span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="170" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请原因" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column label="身份证正面照" width="110" align="center">
        <template>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="身份证反面照" width="110" align="center">
        <template>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="授权书正面照" width="110" align="center">
        <template>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="照片" width="110" align="center">
        <template>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"
          />
        </template>
      </el-table-column>
      <el-table-column label="视频" width="200" align="center">
        <template>
          <video
            width="320"
            height="240"
            controls
            style="width: 150px; height: 100px"
          >
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </template>
      </el-table-column>
      <el-table-column label="上传时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户经理" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="100" align="center">
        <template>
          <el-button type="text" size="small">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      title: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      prepaidOptions: [{ label: '正常', key: '+id' }, { label: '禁用', key: '-id' }],
      sexOptions: [{ label: '男', key: '+id' }, { label: '女', key: '-id' }],
      customerOptions: [{ label: '谭风定', key: '+id' }, { label: '没穿内裤', key: '-id' }],
      applyOptions: [{ label: '原因1', key: '+id' }, { label: '原因2', key: '-id' }],
      importanceOptions: [1, 2, 3],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        date: undefined,
        sort: '+id'
      },
      expands: [],
      getRowKeys(row) {
        return row.id
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 4]
        } else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          return [0, 0]
        }
      } else if (rowIndex % 2 !== 0) {
        if (columnIndex === 0) {
          return [1, 4]
        } else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          return [0, 0]
        }
      }
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log('response: ', response)
        this.list = response.data.items
        this.expands.push(response.data.items[0].id)
        this.listLoading = false
      })
    },
    handleFilter() {
      // this.getList()
      console.log('正在查询了，别催！')
    }
  }
}
</script>
