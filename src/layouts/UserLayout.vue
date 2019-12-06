<template>
  <div class="userLayout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.userLayout {
  height: 100vh;
  background: #f0f2f5;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
</style>
