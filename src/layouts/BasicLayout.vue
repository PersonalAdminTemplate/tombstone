<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">思源</div>
        <SiderMenu :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 24px 24px 0">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import SiderMenu from '../components/SiderMenu'
export default {
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu
  }
}
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 28px;
}
.trigger :hover {
  background-color: #eee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  color: #fff;
  overflow: hidden;
}
</style>
