<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="优惠券名称">
        <el-input v-model="couponInfo.couponName"/>
      </el-form-item>
      <el-form-item label="优惠券类型">
        <el-radio-group v-model="couponInfo.couponType">
          <el-radio label="1">注册卷</el-radio>
          <el-radio label="2">推荐购买卷</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="发行数量">
        <el-input v-model="couponInfo.publishCount"/>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          v-model="couponInfo.startTime"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
        至
        <el-date-picker
          v-model="couponInfo.endTime"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="过期时间">
        <el-date-picker
          v-model="couponInfo.expireTime"
          type="datetime"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd HH:mm:ss" />
      </el-form-item>
      <el-form-item label="直播详情">
        <el-input v-model="couponInfo.ruleDesc" type="textarea" rows="5"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import api from '@/api/activity/couponInfo'

const defaultForm = {
  id: '',
  couponType: '1',
  couponName: '',
  amount: '0',
  conditionAmount: '0',
  startTime: '',
  endTime: '',
  rangeType: '1',
  ruleDesc: '',
  publishCount: '',
  perLimit: '1',
  useCount: '0',
  receiveCount: '',
  expireTime: '',
  publishStatus: ''
}

export default {
  data() {
    return {
      couponInfo: defaultForm,
      saveBtnDisabled: false,

      keyword: '',
      skuInfoList: []
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
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      // debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.couponInfo = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      if (!this.couponInfo.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 新增
    saveData() {
      api.save(this.couponInfo).then(response => {
        // debugger
        if (response.code) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/activity/couponInfo/list' })
        }
      })
    },

    // 根据id更新记录
    updateData() {
      api.updateById(this.couponInfo).then(response => {
        debugger
        if (response.code) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/activity/couponInfo/list' })
        }
      })
    },

    back() {
      this.$router.push({ path: '/activity/couponInfo/list' })
    },

    // 根据id查询记录
    fetchDataById(id) {
      api.getById(id).then(response => {
        // debugger
        this.couponInfo = response.data
      })
    }
  }
}
</script>
