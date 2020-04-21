<template>
	<div class="slot-tree">
        <el-button class="slot-t-top" type="primary" size="small" @click="handleAddTop">添加顶级节点</el-button>
        <el-tree ref="SlotMenuList" class="expand-tree"
        v-if="isLoadingTree"
        node-key="id"
        highlight-current
        :data="setTree"
        :props="defaultProps"
        :expand-on-click-node="false">
        	<span class="slot-t-node" slot-scope="{ node, data }">
        	<!-- 未编辑状态 -->
        		<span v-show="!node.isEdit">
        			<span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{ node.label }}</span>
	        		<span class="slot-t-icons">
	        		<!-- 新增按钮 -->
	        			<el-button icon="el-icon-plus" circle :size="iconSize" type="success" @click="NodeAdd(node, data)"></el-button>
	        		<!-- 编辑按钮 -->
	        			<el-button icon="el-icon-edit" circle :size="iconSize" type="primary" @click="NodeEdit(node, data)"></el-button>
	        		<!-- 删除按钮 -->
	        			<el-button icon="el-icon-delete" circle :size="iconSize" type="warning" @click="NodeDel(node, data)"></el-button>
	        		</span>
        		</span>
        	<!-- 编辑输入框 -->
        		<span v-show="node.isEdit">
        			<el-input class="slot-t-input" size="mini" autofocus
					v-model="data.name"
					:ref="'slotTreeInput'+data.id"
					@blur.stop="NodeBlur(node, data)"
					@keyup.enter.native="NodeBlur(node, data)"></el-input>
        		</span>
        	</span>
        </el-tree>
  	</div>
</template>

<script>
import api from '@/resource/api'
export default{
	name: 'slot-tree',
	data(){
		return {
			maxexpandId: api.maxexpandId,//新增节点开始id
			non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
			isLoadingTree: true,//是否加载节点树
			setTree: api.treelist,//节点树数据
			iconSize: 'mini',
			defaultProps: {
				children: 'children',
				label: 'name'
			}
		}
	},
	methods: {
		handleAddTop(){//添加顶级节点
			this.setTree.push({
				id: ++this.maxexpandId,
				name: '新增顶级节点',
				pid: '',
				children: []
			})
		},
		NodeBlur(n, d){//输入框失焦
			console.log(n, d)
			if(n.isEdit){
				this.$set(n, 'isEdit', false)
			}
		},
		NodeEdit(n, d){//编辑节点
			console.log(n, d)
			if(!n.isEdit){//检测isEdit是否存在or是否为false
				this.$set(n, 'isEdit', true)
			}
			this.$nextTick(() => {
				this.$refs['slotTreeInput'+d.id].$refs.input.focus()
			})
		},
		NodeDel(n, d){//删除节点
			console.log(n, d)
			let that = this;
			if(d.children && d.children.length !== 0){
				this.$message.error("此节点有子级，不可删除！")
				return false;
			}else{
				//新增节点可直接删除，已存在的节点要二次确认
				//删除操作
				let DelFun = () => {
					let _list = n.parent.data.children || n.parent.data;//节点同级数据
					let _index = _list.map((c) => c.id).indexOf(d.id);
					console.log(_index)
					_list.splice(_index, 1);
					this.$message.success("删除成功！")
				}
				//二次确认
				let ConfirmFun = () => {
					this.$confirm("是否删除此节点？","提示",{
						confirmButtonText: "确认",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
						DelFun()
					}).catch(() => {})
				}
				//判断是否是新增节点
				d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
			}
		},
		NodeAdd(n, d){//新增节点
			console.log(n, d)
			//判断层级
			if(n.level >= 3){
				this.$message.error("最多只支持三级！")
				return false;
			}
			//新增数据
			d.children.push({
				id: ++this.maxexpandId,
				name: '新增节点',
				pid: d.id,
				children: []
			})
			//同时展开节点
			if(!n.expanded){
				n.expanded = true
			}
		}
	}
}
</script>

<style>
	.slot-tree{
		width: 80%;
		height: 80%;
		margin: 0 auto;
		padding: 1em;
		max-width: 600px;
		overflow-y: auto;
	}
	/*顶部按钮*/
	.slot-tree .slot-t-top{
		margin-bottom: 15px;
	}
	.slot-tree .slot-t-node span{
		display: inline-block;
	}
	/*节点*/
	.slot-tree .slot-t-node--label{
		font-weight: 600;
	}
	/*输入框*/
	.slot-tree .slot-t-input .el-input__inner{
		height: 26px;
		line-height: 26px;
	}
	/*按钮列表*/
	.slot-tree .slot-t-node .slot-t-icons{
		display: none;
		margin-left: 10px;
	}
	.slot-tree .slot-t-icons .el-button+.el-button{
		margin-left: 6px;
	}
	.slot-tree .el-tree-node__content:hover .slot-t-icons{
		display: inline-block;
	}
</style>