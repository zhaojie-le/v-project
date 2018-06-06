<template>
  <el-main style="min-height: 700px">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <cluster-content></cluster-content>
    <!-- <div class="content-box">
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
            :disabled="true"
            ></el-input>
        </el-form-item>
        <el-form-item label="模版编辑">
          <template-edit
            :data-type="dataTypeList"
            v-model="form.responseTemplate"
          ></template-edit>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="medium" style="float: right"  @click="submitForm('form')">立即创建</el-button>
    </div> -->
  </el-main>
</template>
<script>
import { lstorage } from '../utils/storage'
import ClusterContent from '../components/clusterEdit/content'
export default {
  data () {
    return {
      title:'新建集群',
      form: 'new'
    }
  },
  created () {
    this.form = this.$route.params.form || lstorage.get('form')
    lstorage.set('form', this.form)
    if (this.form === 'list') {
      this.title = '集群详情'
    }
  },
  methods: {
  },
  components: {
    ClusterContent
  },
  destroyed () {
    lstorage.set('form', '')
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  padding: 40px 50px;
  // width: 500px;
}
</style>

