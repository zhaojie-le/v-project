<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right"><router-link :to="'new'">新建接口</router-link></el-button>
    </el-breadcrumb>
    <search :list="infoData.serverClusterList" v-if="infoData"></search>
    <product-list></product-list>
  </el-main>
</template>

<script>
import { lstorage } from '../utils/storage.js'
import Search from '../components/requestList/search'
import ProductList from '../components/requestList/productList'
import { mapState, mapActions } from 'vuex'
export default {
  created () {
    this.getInfoData()
  },
  computed: {
    ...mapState('list', [
      'infoData'
    ])
  },
  methods: {
    ...mapActions('list', [
      'getInfo'
    ]),
    storageInfo (mes) {
      lstorage.set('infoData', mes)
    },
    getInfoData () {
      let parame = {}
      let callback = (data) => {
        if (data.code === 0) {
          this.storageInfo(data.data)
          console.log('ll', data.data.serverClusterList)
        }
      }
      this.getInfo({parame, callback})
    }
  },
  components: {
    Search,
    ProductList
  }
}
</script>
<style lang="scss" scoped>
@import '../style/page/layout.scss';
a {
  color: #fff;
}
</style>
