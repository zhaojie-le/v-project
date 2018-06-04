<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>新建集群</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content-box">
      <el-form :model="form" ref="form" label-width="90px" size="mini" :rules="rules">
        <el-form-item label="集群名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="集群域名" prop="host">
          <el-input v-model="form.host"></el-input>
        </el-form-item>
        <el-form-item label="cookie" prop="cookie">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入cookie内容"
            v-model="form.cookie"
            ></el-input>
        </el-form-item>
        <el-form-item label="header" prop="header">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入header内容"
            v-model="form.header"
            ></el-input>
        </el-form-item>
        <el-form-item label="集群模版" prop="responseTemplate">
          <el-input
            type="textarea"
            :rows="2"
            placeholder=""
            v-model="form.responseTemplate"
            ></el-input>
        </el-form-item>
        <el-form-item label="模版说明">
          <p style="font-size: 12px;color: red">集群模版代表集群下接口默认返回的外层统一结构，其中只能有一个字段是范型，用{}表示，如默认模版中的data字段，状态码为number类型，状态信息为string类型</p>
        </el-form-item>
      </el-form>
      <!-- <response :is-generic="1" v-model="responseTemplate"></response> -->
      <el-button type="primary" size="medium" style="float: right"  @click="submitForm('form')">立即创建</el-button>
    </div>
  </el-main>
</template>

<script>
var obj = {
          "code":0,
          "data":{},
          "message":''
        }
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui'
import { lstorage } from '../utils/storage'
export default {
  data () {
    return {
      infoData: null,
      form: {
        host: '',
        name: '',
        header: '',
        cookie: '',
        responseTemplate: JSON.stringify(obj)
      },
      responseTemplate: null,
      rules: {
        name: [
          { required: true, message: '请输入集群名称', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState('detail', [
      'dataTypeList'
    ])
  },
  methods: {
    ...mapActions('list', [
      'getInfo',
      'getClusterList'
    ]),
    ...mapActions('create', [
      'newCluster'
    ]),
    ...mapActions('detail', [
      'getDataType'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitAjax()
        } else {
          return false
        }
      })
    },
    submitAjax () {
      let parame = this.form
      let callback = (data) => {
        if (data.code === 0) {
          this.clusterListAjax()
          // 提交成功-回到集群列表页
          this.$router.push({name: 'clulist'})
        } else {
          Message.error(data.message)
        }
      }
      this.newCluster({parame, callback})
    },
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
    // Response
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  padding: 40px 50px;
  // width: 500px;
}
</style>

