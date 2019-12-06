<template>
  <div class="main">
    <div class="loginTitle">思源</div>
    <a-form :layout="formLayout" class="loginForm" :form="form">
      <a-form-item>
        <a-input
          v-decorator="[
            'account',
            {
              initailValue: account,
              rules: [{ required: true, min: 11, message: '账号为11位手机号' }]
            }
          ]"
          size="large"
          placeholder="请输入账号"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {
              initailValue: password,
              rules: [
                { required: true, min: 6, message: '密码长度必须是六位或以上' }
              ]
            }
          ]"
          size="large"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          class="loginSubmit"
          @click="loginSubmit"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import API from '@/utils/api'
export default {
  name: 'login',
  data() {
    return {
      formLayout: 'horizontal',
      account: '',
      password: ''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    loginSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$post(API.login, values).then(res => {
            if (res) {
              this.$message.success('登录成功！')
              cookie.set('userInfo', res)
              cookie.set('roleId', 1)
              this.$router.push('/')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  padding: 130px 0 24px;
}
.loginTitle {
  text-align: center;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 33px;
  margin-bottom: 60px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
}
.loginForm {
  width: 368px;
  margin: 0 auto;
}
.loginSubmit {
  width: 100%;
}
.ant-form-item {
  margin: 0 2px 24px;
}
</style>
