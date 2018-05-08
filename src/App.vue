<template>
  <div>
    <el-container>
      <header-title></header-title>
      <router-view style="border: 30px solid #f1f5f7"></router-view>
      <!-- <el-footer>2018 &copy; 到家MOCK平台</el-footer> -->
      <el-footer>2018 &copy; 到家MOCK平台</el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderTitle from './components/base/HeaderTitle'
export default {
  name: 'app',
  components: {
    HeaderTitle
  }
}
</script>

<style lang="scss">
@import './style/base.scss';
@import './style/page/layout.scss';
.body{
  margin: 0;
}
</style>
