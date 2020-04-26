<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree"
      :filter-node-method="filterNode"
      class="filter-tree"
      :data="data2"
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
            @click="uploadFile"
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
            @click="uploadFile"
          >
            <svg-icon icon-class="download" />
          </el-button>
          <el-button
            v-show="data.del"
            class="btn_del"
            type="text"
            size="mini"
            @click="delFile(data)"
          >
            <i class="el-icon-folder-delete" />
          </el-button>
        </span>
      </span>
    </el-tree>
    <!-- <el-tree ref="tree" class="filter-tree" :data="data2" :props="defaultProps" default-expand-all node-key="id" :filter-node-method="filterNode">
      <span slot-scope="{ node, data }" class="custom-tree-node" style="width:100%;" @mouseenter="mouseenter(data)" @mouseleave="mouseleave(data)">
        <span>{{ node.label }}</span>
        <el-link v-show="data.del" size="mini" type="primary" style="float:right;" icon="el-icon-delete" @click="alert('删除')" />
        <el-link v-show="data.del" size="mini" type="primary" style="margin-right: 10px;float:right;" icon="el-icon-edit" @click="alert('修改')" />
      </span>

    </el-tree> -->
  </div>

</template>

<script>
import Upload from '@/components/Uploader/Upload'

export default {
  name: 'FileList',
  components: {
    Upload
  },

  data() {
    return {
      expanded_keys: [], // 展开
      checked_keys: [], // 点击
      filterText: '',
      dialogUpload: false,
      path: '',
      data2: [{
        id: 'root',
        label: 'root',
        children: [{
          id: 'root_src',
          label: 'src',
          children: [{
            id: 'root_src_filehash1',
            label: 'Level three 1-1-1'
          }, {
            id: 'root_src_filehash',
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: '2',
        label: 'Level one 2',
        children: [{
          id: '5',
          label: 'Level two 2-1'
        }, {
          id: '6',
          label: 'Level two 2-2'
        }]
      }, {
        id: '3',
        label: 'Level one 3',
        children: [{
          id: '7',
          label: 'Level two 3-1'
        }, {
          id: '8',
          label: 'Level two 3-2'
        }]
      }],
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    uploadFile() {
      this.dialogUpload = true
      this.path = this.$refs.tree.getCurrentKey()
    },
    delFile(data) {
      // 删除
      // 获取当前被选中的id
      console.log(this.$refs.tree.getCurrentKey())
      // console.log(data.id)
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
