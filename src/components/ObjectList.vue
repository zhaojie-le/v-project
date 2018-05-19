<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>对象列表页</el-breadcrumb-item>
      <el-button type="primary" size="small" style="float: right"><router-link :to="'newobject'">新建对象</router-link></el-button>
    </el-breadcrumb>
    <search :list="clusterList" v-if="clusterList"></search>
    <object-list :object-data="objData" v-if="objData"></object-list>
  </el-main>
</template>

<script>
import { lstorage } from '../utils/storage'
import Search from '../components/objectList/search'
import ObjectList from '../components/objectList/objectList'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      infoData: null,
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
  },
  methods: {
    ...mapActions('list', [
      'getInfo',
      'objectList'
    ]),
    getObject () {
      let parame = {}
      let callback = (data) => {}
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

