<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 20px">
        <el-breadcrumb-item :to="{ path: '/list' }">MOCK平台</el-breadcrumb-item>
        <el-breadcrumb-item><span>接口详情页</span></el-breadcrumb-item>
      </el-breadcrumb>
    <el-container>
      <el-main style="padding: 20px 50px">
        <!-- 接口详情模块 -->
        <request-content :requestid="parseInt(id)"></request-content>
      </el-main>
    </el-container>
  </el-main>
</template>
<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../utils/storage'
import RequestContent from '../components/requestDetail/index'
export default {
  data () {
    return {
      isDetail: 1,             // 展示接口列表或对象列表
      id: 0             // 接口id
    }
  },
  created () {
    this.id = this.$route.params.id || lstorage.get('id')
    this.getRequestDetail(this.id)
    lstorage.set('id', this.id)
    console.log('~~~~~~id~~~~~', this.id)
  },
  computed: {
    ...mapState('detail', [
      'requestid'             // 接口id
    ])
  },
  methods: {
    ...mapActions('detail', [
      'getRequest'             // 获取接口信息
    ]),
    /**
     * 获取接口详情数据
     * @param {number} id
     */
    getRequestDetail (id) {
      let parame = {
        id: id,
        number: new Date()
      }
      let callback = (data) => {
        if (data) {
          if (data.code !== 0) {
            // 报错信息，toast提示
            this.$message.error(data.message)
          }
        }
      }
      this.getRequest({parame, callback})
    }
  },
  components: {
    RequestContent
  }
}
</script>
<style lang="scss">
</style>
