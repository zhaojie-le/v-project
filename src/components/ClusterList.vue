<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>集群列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right"><router-link :to="{ name: 'cluster', params: { from: 'new' }}">新建集群</router-link></el-button>
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
          <el-button @click="handleCurrentChange(scope.row)" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { mapActions } from 'vuex'
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
    toDetail (item) {
      // 跳转编辑集群页面
      this.$router.push({name: 'cluster', params: { id: item.id,from:'list' }})
    },
    handleCurrentChange (val) {
      this.toDetail(val)
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  color: #fff;
}
</style>

