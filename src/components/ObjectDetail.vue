<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
        <el-breadcrumb-item :to="{ path: '/object' }">MOCK平台</el-breadcrumb-item>
        <el-breadcrumb-item><span>实体详情页</span></el-breadcrumb-item>
      </el-breadcrumb>
    <el-container>
      <el-main style="padding: 20px 50px">
        <!-- 接口详情模块 -->
        <object-content :object-data="objectData" v-if="objectData"></object-content>
      </el-main>
    </el-container>
  </el-main>
</template>
<script>
import { Message } from 'element-ui'
import { lstorage } from '../utils/storage'
import { mapActions, mapState } from 'vuex'
import ObjectContent from '../components/objectDetail/index'
export default {
  data () {
    return {
      id: ''
    }
  },
  created () {
    this.id = this.$route.params.id || lstorage.get('id')
    lstorage.set('id', this.id)
    this.getObjectDetail(this.id)
  },
  computed: {
    ...mapState('detail', [
      'objectData'
    ])
  },
  methods: {
    ...mapActions('detail', [
      'objectDetail'
    ]),
    /**
     * 获取接口详情数据
     * @param {number} id
     */
    getObjectDetail (id) {
      let parame = {
        id: id
      }
      let callback = (data) => {
        if (data && data.code !== 0) {
          this.$message.error(data.message)
        }
      }
      this.objectDetail({parame, callback})
    }
  },
  components: {
    ObjectContent
  }
}
</script>
<style lang="scss">
</style>
