<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <el-card style="margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <span>菜单管理</span>
              <el-button class="menufocus-button" type="text">新增</el-button>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="path"
              border
              default-expand-all
              :show-header="status"
              :tree-props="{ children: 'children' }"
              @row-click="changeRow"
            >
              <el-table-column prop="meta.title" />
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card style="margin-bottom: 20px">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline menufocus"
            >
              <el-form-item label="上级菜单" class="menufocus-item">
                <el-select
                  v-model="formInline.region"
                  class="menufocus-select-first"
                  placeholder="请选择上级菜单"
                >
                  <el-option label="根节点" value="shanghai" />
                  <el-option label="叶子" value="beijing" />
                </el-select>
              </el-form-item>
              <el-form-item label="菜单名称">
                <el-input v-model="formInline.name" />
              </el-form-item>
              <el-form-item label="菜单编号">
                <el-input v-model="formInline.user" />
              </el-form-item>
              <el-form-item label="菜单类型">
                <el-radio-group v-model="formInline.resource">
                  <el-radio label="节点" />
                  <el-radio label="叶子" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单层级">
                <el-input v-model="formInline.user" />
              </el-form-item>
              <el-form-item label="菜单URL" class="menufocus-item">
                <el-col :span="18">
                  <el-input
                    v-model="formInline.user"
                    class="menufocus-select-second"
                  />
                </el-col>
              </el-form-item>
              <el-form-item label="显示顺序">
                <el-input v-model="formInline.user" />
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="formInline.resource">
                  <el-radio label="显示" />
                  <el-radio label="隐藏" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="活动形式" class="menufocus-item">
                <el-input
                  v-model="formInline.desc"
                  type="textarea"
                  class="menufocus-select-third"
                />
              </el-form-item>
              <el-form-item style="place-items:center;">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      status: false,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  created() {
    const routeArr = this.$router.options.routes
    this.tableData = routeArr.reduce((tem, cur) => {
      cur.hidden !== true && tem.push(cur)
      return tem
    }, [])
  },
  methods: {
    changeRow(row, column, event) {
      console.log('row: ', row)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}

</script>

<style>
</style>
