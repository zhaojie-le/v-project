<template>
  <el-header>
    <el-menu
      :default-active="page"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="ser"><router-link :to="'clulist'">集群列表页</router-link></el-menu-item>
        <el-menu-item index="list"><router-link :to="'list'">接口列表页</router-link></el-menu-item>
        <el-menu-item index="object"><router-link :to="'object'">实体列表页</router-link></el-menu-item>
        <el-menu-item index="2"><a :href="url" target="_blank">使用文档</a></el-menu-item>
    </el-menu>
  </el-header>
</template>
<script>
import API from '../../service/API'
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
      userName: '',
      url:''
    }
  },
  created () {
    // this.userName = lstorage.get('infoData') ? lstorage.get('infoData').userName : ''
    this.url = 'https://static.daojia.com/assets/other/mock-platform/dist/docs/index.html'
  },
  methods: {
    toGuide () {
      window.location.href = 'https://static.daojia.com/assets/other/mock-platform/dist/docs/index.html'
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
  padding-left: 10px;
  // margin-bottom: 60px;
}
</style>
