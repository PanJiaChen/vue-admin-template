<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree"
      :filter-node-method="filterNode"
      class="filter-tree"

      node-key="id"
      lazy
      accordion
      :load="loadNode"
      :default-expanded-keys="expanded_keys"
      :default-checked-keys="checked_keys"
      :props="props"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node" style="width:100%;" @mouseenter="mouseenter(data)" @mouseleave="mouseleave(data)">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-show="data.del"
            class="btn_upload"
            type="text"
            size="mini"
            @click="uploadFile(data)"
          >
            <i class="el-icon-upload" />
          </el-button>

          <el-dialog title="文件上传" :visible.sync="dialogUpload" width="80%">

            <Upload :path="path" />
          </el-dialog>
          <el-button
            v-show="data.del"
            class="btn_download"
            type="text"
            size="mini"
            @click="download(data)"
          >
            <svg-icon icon-class="download" />
          </el-button>
          <el-button
            v-show="data.del"
            class="btn_del"
            type="text"
            size="mini"
            @click="addFolder(data)"
          >
            <svg-icon icon-class="NewFolder" />
          </el-button>
          <el-dialog title="新增文件夹" :visible.sync="dialogNewFolder" width="80%">
            <NewFolder :path="path" />
          </el-dialog>

          <el-button
            v-show="data.del"
            class="btn_del"
            type="text"
            size="mini"
            @click="delFile(data)"
          >
            <svg-icon icon-class="delete" />
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>

</template>

<script>
import Upload from '@/components/Uploader/Upload'
import NewFolder from '@/components/Uploader/NewFolder'

// import fileDownload from 'js-file-download'
// import axios from 'axios'

export default {
  name: 'FileList',
  components: {
    Upload,
    NewFolder
  },

  data() {
    return {
      expanded_keys: [], // 展开
      checked_keys: [], // 点击
      filterText: '',
      dialogUpload: false,
      dialogNewFolder: false,
      path: '',
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    uploadFile(data) {
      this.dialogUpload = true
      this.path = data.zones
    },
    download(tree) {
      // console.log(tree.zones)

      window.open('/api/download?filehash=' + tree.zones, '_blank')
    },
    addFolder(tree) {
      this.dialogNewFolder = true
      this.path = tree.zones
    },
    delFile(tree) {
      // 删除
      // 获取当前被选中的tree.zones
      console.log(tree.zones)
      const data = {
        'zones': tree.zones
      }
      this.$store
        .dispatch('folder/delete', data)
        .then(() => {

        })
        .catch(() => {

        })
    },
    mouseenter(data) {
      this.$set(data, 'del', true)
    },
    mouseleave(data) {
      this.$set(data, 'del', false)
    },
    loadNode(node, resolve) {
      const data = [{
        name: '文件列表',
        zones: 'root'
      }]
      if (node.level === 0) {
        return resolve(data)
      }
      if (node.level >= 1) {
        console.log(node.data.zones)
        const data = {
          'zones': node.data.zones
        }
        this.$store
          .dispatch('folder/getTreeInfo', data) // 登录操作 ./store/modules/user.js
          .then(res => {
            return resolve(res)
          })
          .catch(() => {
            return resolve([])
          })
        return resolve([])
      }
    }

  }
}
</script>

<style scoped>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    padding-right: 8px;
  }
  .btn_upload,.btn_del,.btn_download {
    font-size: 24px;
  }

</style>
