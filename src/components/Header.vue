<template>
  <div class="herader">
    <!-- <a-badge :count="number">
      <a-icon type="bell" style="fontSize: 24px;" @click="view" />
    </a-badge> -->
    <a-dropdown style="margin-left: 20px;">
      <a class="ant-dropdown-link" href="#">
        <a-avatar size="large">{{ nickname }}</a-avatar>
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="editPassword">
          <a href="javascript:;">修改密码</a>
        </a-menu-item>
        <a-menu-item @click="logout">
          <a href="javascript:;">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: '',
  data() {
    return {
      nickname: '',
      number: 0
    }
  },
  created() {
    const userInfo = JSON.parse(Cookie.get('userInfo'))
    this.nickname = userInfo.nickname || '管理员'
  },
  methods: {
    editPassword() {
      this.$router.push('/user/editPassword')
    },
    logout() {
      Cookie.set('roleId', '')
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>
.herader {
  float: right;
  padding-right: 30px;
}
</style>
