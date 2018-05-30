<template>
  <el-header>
    <el-menu
      :default-active="page"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="ser"><router-link :to="'clulist'">集群列表页</router-link></el-menu-item>
        <el-menu-item index="list"><router-link :to="'list'">接口列表页</router-link></el-menu-item>
        <el-menu-item index="object"><router-link :to="'object'">对象列表页</router-link></el-menu-item>
        <!-- <el-menu-item index="2"><a href="http://static.djtest.cn/assets/other/mock-platform/out/index03.html" target="_blank">使用文档</a></el-menu-item> -->
    </el-menu>
  </el-header>
</template>
<script>
import { lstorage } from '../../utils/storage'
export default {
  props: {
    title: {
      type: String
    },
    page: {
      type: String
    }
  },
  data () {
    return {
      userName: ''
    }
  },
  created () {
    this.userName = lstorage.get('infoData') ? lstorage.get('infoData').userName : ''
  },
  methods: {
    backLogin () {
      window.location.href = '/loginout'
    },
    toGuide () {
      window.location.href = 'https://static.daojia.com/assets/other/mock-platform/out/index02.html'
    },
    handleSelect (key, keyPath) {
      if (key === '3') {
        this.backLogin()
      }
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.el-menu-demo{
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1000;
  margin-bottom: 60px;
}
</style>
