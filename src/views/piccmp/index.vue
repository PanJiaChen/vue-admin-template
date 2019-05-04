<template>
  <div class="app-container">
    <el-row>
      <img src="@/assets/school_logo.png" class="bg-title" alt="logo">
    </el-row>
    <el-row>
      <el-col
        :md="{span: 12, offset: 6}"
        :xs="{span: 20, offset: 2}"
      >
        <el-form :inline="true">
          <el-form-item>
            <el-upload
              ref="fileform"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :limit="2"
              :file-list="fileList"
              :on-change="onChange"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-exceed="handleExceed"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-input v-model="fileName" placeholder="待上传..." :disabled="true" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="submitFile"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :md="{span: 12, offset: 6}"
        :xs="{span: 20, offset: 2}"
      >
        <div style="margin-right: 20px">
          <el-collapse>
            <el-collapse-item title="&nbsp;高级选项">
              <el-form>
                <el-form-item label="身份">
                  <el-select v-model="value" placeholder="全部" value="value">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="radio" @change="radioChange">
                    <el-radio label="所有">所有</el-radio>
                    <el-radio label="男性">男</el-radio>
                    <el-radio label="女性">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="阈值">
                  <el-input
                    v-model="threshold"
                    placeholder="请填写阈值百分比..."
                    clearable
                    style="width: inherit"
                  >
                    <template v-slot:append>%</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { compare } from '../../api/piccmp'
export default {
  name: 'PicCmp',
  data() {
    return {
      fileList: [],
      value: '',
      options: [
        {
          value: 'student',
          label: '学生'
        },
        {
          value: 'teacher',
          label: '教师'
        }
      ],
      radio: '1',
      threshold: '',
      sex: '',
      fileForm: null
    }
  },
  computed: {
    fileName: {
      get: function() {
        if (this.fileList[0] && this.fileList[0].name) {
          return this.fileList[0].name
        } else {
          return ''
        }
      },
      set: function(value) {
        this.fileList[0].name = value
      }
    }
  },
  methods: {
    onChange(file, fileList) {
      console.log('change')
      console.log(fileList)
      if (this.fileList.length > 0) {
        this.fileList.splice(0, 1, file)
      } else {
        this.fileList.push(file)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file, fileList) {
      console.log(file, fileList)
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    radioChange(label) {
      this.sex = label
    },
    submitFile() {
      const fileform = new FormData()
      const filter = {
        sex: this.sex,
        groupID: this.value,
        threshold: this.threshold,
        limit: '3'
      }
      fileform.append('file', this.fileList[0].raw)
      fileform.append('maxSize', '8')
      fileform.append('pageSize', '4')
      fileform.append('filter', JSON.stringify(filter))
      // console.log(filter)
      this.fileForm = fileform
      console.log(this.fileForm)
      compare(this.fileForm).then(response => {
        const { data } = response
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .app-container {
    min-height: inherit;
    background: skyblue;
    /*background: url("../../assets/bg.jpg"), no-repeat center fixed;*/
  }
  .bg-title {
    width: 40%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  #filename {
    width: 100%;
  }
</style>

