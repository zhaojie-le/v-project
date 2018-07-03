<template>
  <el-header class="header-box">
    <!-- <el-menu
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
    </el-menu> -->
    <ul class="menu">
        <li v-for="(item,index) in tlist" :key="index" @click="changTitle(index)" :class="{ selected: inx === index}">{{item.name}}</li>
    </ul>
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
      url:'',
      tlist: [
        {name: '集群列表页'},
        {name: '使用文档'}
      ],
      inx: 0
    }
  },
  created () {
    this.userName = lstorage.get('infoData') ? lstorage.get('infoData').userName : ''
    this.url = window.location.origin + '/docs/index.html'
  },
  methods: {
    changTitle (index) {
      this.inx = index
      if (index === 0) {
        this.$router.push({name: 'clulist'})
      }
      if (index === 1) {
        window.open('http://static.daojia.com/assets/other/mock-platform/dist/docs/index.html')
      }
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
.header-box{
  background: #545c64;
  font-size: 14px;
  ul{
    // margin-left: 17px;
    // position: relative;
    background: #545c64;
    padding-left: 17px;
  }
  li{
    color: #fff;
    display: inline-block;
    float: left;
    width: 112px;
    cursor: pointer;
    box-sizing: border-box;
    height: 60px;
  }
  .selected{
    color: rgb(255, 208, 75);
    border-bottom: 2px solid rgb(255, 208, 75);
  }
}

.menu{
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1000;
  // padding-left: 10px;
  // margin-bottom: 60px;
}
</style>
