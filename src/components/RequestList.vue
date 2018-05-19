<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right"><router-link :to="'new'">新建接口</router-link></el-button>
    </el-breadcrumb>
    <search :list="clusterList" v-if="clusterList"></search>
    <list></list>
  </el-main>
</template>

<script>
import { lstorage } from '../utils/storage.js'
import Search from '../components/requestList/search'
import List from '../components/requestList/list'
import { mapState, mapActions } from 'vuex'
export default {
  created () {
    this.clusterListAjax()
  },
  computed: {
    ...mapState('list', [
      'clusterList'
    ])
  },
  methods: {
    ...mapActions('list', [
      'getInfo',
      'getClusterList'
    ]),
    clusterListAjax () {
      let parame = {name: ''}
      let callback = (data) => {
        if (data.code === 0) {
          lstorage.set('clusterList', data.data.clusterList)
        }
      }
      this.getClusterList({parame, callback})
    }
  },
  components: {
    Search,
    List
  }
}
</script>
<style lang="scss" scoped>
@import '../style/page/layout.scss';
a {
  color: #fff;
}
</style>
