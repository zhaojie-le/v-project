<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>集群列表页</el-breadcrumb-item>
      <!-- <el-button type="primary" size="small" style="float: right" @click="newClick"><router-link :to="{ name: 'cluster', params: { from: 'new' }}">新建集群</router-link></el-button> -->
      <el-button type="primary" size="small" style="float: right" @click="newClick">新建集群</el-button>
    </el-breadcrumb>
    <el-table
      :data="list"
      stripe
      style="width: 100%; margin-top: 30px;"
      >
      <el-table-column
        prop="name"
        label="集群名称"
        >
      </el-table-column>
      <el-table-column
        prop="host"
        label="集群域名"
        >
      </el-table-column>
      <el-table-column
        prop="header"
        label="header"
        >
      </el-table-column>
      <el-table-column
        prop="cookie"
        label="cookie"
        >
      </el-table-column>
      <el-table-column
        prop="responseTemplate"
        label="集群响应模版"
        >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button @click="clusterClick(scope.row)" type="text" size="small">集群</el-button>
          <el-button @click="requestClick(scope.row)" type="text" size="small">接口</el-button>
          <el-button @click="entityClick(scope.row)" type="text" size="small">实体</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { mapActions } from 'vuex'
import { lstorage } from '../utils/storage'
export default {
  data () {
    return {
      list: null
    }
  },
  created () {
    this.getCluster()
  },
  methods: {
    ...mapActions('list', [
      'getClusterList'
    ]),
    getCluster () {
      let parame = {}
      let callback = (data) => {
        if (data.code === 0) {
          this.list = data.data.clusterList
        }
      }
      this.getClusterList({parame, callback})
    },
    newClick () {
      this.$router.push({ name: 'cluster', params: { from: 'new' }})
    },
    clusterClick (item) {
      lstorage.set('clusterId', item.id)
      this.$router.push({name: 'cluster', params: { id: item.id,from:'list' }})
    },
    requestClick (item) {
      lstorage.set('clusterId', item.id)
      this.$router.push({name: 'reqall', params: { id: item.id,from:'list' }})
    },
    entityClick (item) {
      lstorage.set('clusterId', item.id)
      this.$router.push({name: 'entall', params: { id: item.id,from:'list' }})
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  color: #fff;
}
</style>

