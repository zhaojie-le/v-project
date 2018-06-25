<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right" @click="newClick">新建接口</el-button>
    </el-breadcrumb>
    <search :list="clusterList" v-if="clusterList"></search>
    <list></list>
  </el-main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { lstorage } from '../utils/storage.js'
import Search from '../components/requestList/search'
import List from '../components/requestList/list'

export default {
  created () {
    this.clusterListAjax()
    this.changePage(1)
  },
  computed: {
    ...mapState('list', [
      'clusterList'
    ])
  },
  methods: {
    ...mapActions('list', [
      'getInfo',
      'changePage',
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
    },
    newClick () {
      this.$router.push({name: 'new'})
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
