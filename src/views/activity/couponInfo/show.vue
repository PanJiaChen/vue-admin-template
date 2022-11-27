<template>
  <div class="app-container">

    <h4>优惠券信息</h4>
    <table class="table table-striped table-condenseda table-bordered" width="100%">
      <tbody>
      <tr>
        <th width="15%">优惠券名称</th>
        <td width="35%"><b style="font-size: 14px">{{ couponInfo.couponName }}</b></td>
        <th width="15%">优惠券类型</th>
        <td width="35%">
          {{ couponInfo.couponType == 'REGISTER' ? '注册卷' : '推荐赠送卷' }}
        </td>
      </tr>
      <tr>
        <th>发行数量</th>
        <td>{{ couponInfo.publishCount }}</td>
        <th>每人限领次数</th>
        <td>{{ couponInfo.perLimit }}</td>
      </tr>
      <tr>
        <th>领取数量</th>
        <td>{{ couponInfo.receiveCount }}</td>
        <th>使用数量</th>
        <td>{{ couponInfo.useCount }}</td>
      </tr>
      <tr>
        <th>领取时间</th>
        <td>{{ couponInfo.startTime }}至{{ couponInfo.endTime }}</td>
        <th>过期时间</th>
        <td>{{ couponInfo.expireTime }}</td>
      </tr>
      <tr>
        <th>规则描述</th>
        <td colspan="3">{{ couponInfo.ruleDesc }}</td>
      </tr>
      </tbody>
    </table>

    <h4>
      优惠券发放列表&nbsp;&nbsp;&nbsp;
    </h4>
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="param.nickName" label="用户昵称" />
      <el-table-column prop="param.phone" label="手机号" />
      <el-table-column label="使用状态">
        <template slot-scope="scope">
          {{ scope.row.couponStatus == 'NOT_USED' ? '未使用' : '已使用' }}
        </template>
      </el-table-column>
      <el-table-column prop="getTime" label="获取时间" />
      <el-table-column prop="usingTime" label="使用时间" />
      <el-table-column prop="usedTime" label="支付时间" />
      <el-table-column prop="expireTime" label="过期时间" />
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />

    <div style="margin-top: 15px;">
      <el-form label-width="0px">
        <el-form-item>
          <el-button @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api/activity/couponInfo'
export default {
  data() {
    return {
      listLoading: false, // 数据是否正在加载

      couponId: null,
      couponInfo: {},

      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {} // 查询表单对象
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.couponId = this.$route.params.id
    // 获取优惠券信息
    this.fetchDataById()
    this.fetchData()
  },

  methods: {

    // 根据id查询记录
    fetchDataById() {
      api.getById(this.couponId).then(response => {
        //
        this.couponInfo = response.data
      })
    },

    // 当页码发生改变的时候
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData(1)
    },

    // 加载banner列表数据
    fetchData(page = 1) {
      console.log('翻页。。。' + page)
      // 异步获取远程数据（ajax）
      this.page = page
      this.searchObj.couponId = this.couponId
      api.getPageCouponUseList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.records
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    back() {
      this.$router.push({ path: '/activity/couponInfo/list' })
    }
  }
}
</script>
<style>
  .app-container h4 {
    color: #606266;
  }
</style>
