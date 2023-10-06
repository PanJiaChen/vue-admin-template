<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">欢迎使用社团管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 25px; margin-left: -1px"
        @click="dialogFormVisible = true"
        >注册
      </el-button>
    </el-form>

    <!-- 注册组件   -->
    <div class="register-input">
      <el-dialog
        title="用户注册"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form :model="form" :rules="register_rules" ref="registerForm">
          <el-form-item
            label="用户账号"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              :key="form.passwordType"
              v-model="form.password"
              autocomplete="off"
              :type="form.passwordType"
              ref="registerPasswd"
            ></el-input>
            <span class="show-pwd" @click="showRegisterPwd">
              <svg-icon
                :icon-class="
                  form.passwordType === 'password' ? 'eye' : 'eye-open'
                "
              />
            </span>
          </el-form-item>

          <el-form-item
            label="确认密码"
            :label-width="formLabelWidth"
            prop="confirmPassword"
          >
            <el-input
              :key="form.confirmPasswordType"
              v-model="form.confirmPassword"
              autocomplete="off"
              :type="form.confirmPasswordType"
              ref="registerPasswd"
            ></el-input>
            <span class="show-pwd" @click="showConfirmPwd">
              <svg-icon
                :icon-class="
                  form.confirmPasswordType === 'password' ? 'eye' : 'eye-open'
                "
              />
            </span>
          </el-form-item>

          <el-form-item
            label="用户姓名"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRegister">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        passwordType: "password",
        confirmPasswordType: "password",
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      register_rules: {
        username: [
          { required: true, message: "账号为必填项", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/,
            message: "必须以数字或字母开头，且只能包含字母、数字、-和_",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "账号长度在 6 到 12 个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在6到16个字符之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [{ validator: validateConfirm, trigger: "blur" }],
        name: [
          { required: true, trigger: "blur", message: "姓名为必填项" },
          { max: 20, message: "姓名不得超过20字符", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    showRegisterPwd() {
      if (this.form.passwordType === "password") {
        this.form.passwordType = "";
      } else {
        this.form.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.registerPasswd.focus();
      });
    },
    showConfirmPwd() {
      if (this.form.confirmPasswordType === "password") {
        this.form.confirmPasswordType = "";
      } else {
        this.form.confirmPasswordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.confirmPassword.focus();
      });
    },
    handleRegister() {
      const data = {
        username: this.form.username,
        password: this.form.password,
        name: this.form.name,
      };
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          register(data)
            .then((response) => {
              console.log(response);
              this.$message({
                message: "注册成功!!",
                type: "success",
              });
              this.dialogFormVisible = false;
            })
            .catch((err) => {});
          this.form.username = "";
          this.form.password = "";
          this.form.name = "";
        } else {
          return false;
        }
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.register-input {
  .el-input {
    input {
      color: black;
      caret-color: black;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: black;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
