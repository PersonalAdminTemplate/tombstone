<template>
  <div>
    <a-card :bordered="false" title="修改密码" class="card">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="原密码">
          <a-input
            v-decorator="[
              'oldPassword',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入原密码!'
                  }
                ]
              }
            ]"
            type="password"
            style="width: 50%"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="新密码">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
            style="width: 50%"
            @blur="handleNewPasswordBlur"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: '请确认密码!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            style="width: 50%"
            @blur="handleConfirmBlur"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">确认修改</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import API from '@/utils/api'
export default {
  name: '',
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        }
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  created() {
    this.userInfo = JSON.parse(Cookie.get('userInfo'))
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const param = {
            id: this.userInfo.id,
            account: this.userInfo.account,
            password: values.oldPassword,
            newPassword: values.password
          }
          this.$post(API.update, param).then(res => {
            if (res === undefined) {
              return false
            }
            this.$message.success('修改成功，请重新登录！')
            Cookie.set('roleId', '')
            this.$router.push('/user')
          })
        }
      })
    },
    handleNewPasswordBlur(e) {
      console.log(e)
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('您输入的两个密码不一致!')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && value === form.getFieldValue('oldPassword')) {
        callback('新密码不能与旧密码一致!')
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  }
}
</script>

<style lang="" scoped></style>
