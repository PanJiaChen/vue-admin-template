<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="社团名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="社团类型" prop="type">
        <el-select
          v-model="form.type"
          class="filter-item"
          clearable
          placeholder="请选择社团种类"
        >
          <el-option
            v-for="item in clubTypes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="社团简介" prop="club_detail">
        <el-input :rows="10" v-model="form.club_detail" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createClub()">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { createClub, getClubTypeList, postTest } from "@/api/club";
import { getCurTime } from "@/utils/timeFormat";
export default {
  data() {
    return {
      clubTypes: "",
      form: {
        applicant_id: "",
        apply_time: "",
        name: "",
        type: "",
        club_detail: "",
      },
      createForm: {
        applicant_id: "",
        apply_time: "",
        application_detail: {
          name: "",
          type: "",
          club_detail: "",
        },
      },
      rules: {
        name: [
          { required: true, message: "请输入社团名称", trigger: "change" },
          {
            min: 3,
            max: 15,
            message: "社团名称长度在 3 到 15 个字符之间",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择社团类型", trigger: "change" },
        ],
        club_detail: [
          { required: true, message: "请输入社团简介！", trigger: "change" },
        ],
      },
    };
  },

  uid: Number,
  computed: {
    ...mapGetters(["uid"]),
  },
  created() {
    this.form.applicant_id = this.uid;
    this.getClubTypes();
  },
  methods: {
    getClubTypes() {
      getClubTypeList().then((res) => {
        this.clubTypes = res.data.type;
      });
    },
    createClub() {
      this.form.apply_time = getCurTime();
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.createForm.applicant_id = this.form.applicant_id;
          this.createForm.apply_time = this.form.apply_time;
          this.createForm.application_detail.name = this.form.name;
          this.createForm.application_detail.club_detail =
            this.form.club_detail;
          this.createForm.application_detail.type = this.form.type;

          this.$confirm(
            "您确定要创建社团：" + this.form.name + " 吗？",
            "申请确认",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true,
            }
          ).then(() => {
            setTimeout(() => {
              createClub(this.createForm).then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "申请成功！",
                });
                setTimeout(() => {
                  this.resetForm("form");
                });
              });
            });
          });
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("reset");
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
