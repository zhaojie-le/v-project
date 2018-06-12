<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>实体列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right"><router-link :to="'newobject'">新建实体</router-link></el-button>
    </el-breadcrumb>
    <search :list="clusterList" v-if="clusterList"></search>
    <object-list></object-list>
  </el-main>
</template>

<script>
import { Message } from 'element-ui'
import { mapState, mapActions } from 'vuex'
import { lstorage } from '../utils/storage'
import Search from '../components/objectList/search'
import ObjectList from '../components/objectList/list'

export default {
  data () {
    return {
      clusterList: null
    }
  },
  computed: {
    ...mapState('list', [
      'objData'
    ])
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
    this.getObject()
    this.changePage(1)
  },
  methods: {
    ...mapActions('list', [
      'getInfo',
      'objectList',
      'changePage'
    ]),
    getObject () {
      let parame = {}
      let callback = (data) => {
        if (data && data.code !== 0) {
          Message.error(data.message)
        }
      }
      this.objectList({parame, callback})
    }
  },
  components: {
    Search,
    ObjectList
  }
}
</script>
<style lang="scss" scoped>
@import '../style/page/layout.scss';
a {
  color: #fff;
}
</style>

