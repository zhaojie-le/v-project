<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/list' }">MOCK平台</el-breadcrumb-item>
      <el-breadcrumb-item>新建接口页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" label-width="90px" size="mini" class="form-s" :rules="rules" ref="form">
      <el-form-item
        label="所属集群"
        prop="clusterId"
      >
        <el-select  v-model="form.clusterId" placeholder="请选择接口所属集群" filterable size="mini" style="width: 100%">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in clusterList">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="接口名称"
        prop="name"
      >
        <el-input v-model="form.name" placeholder="输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="所属项目" prop="projectName">
        <el-input v-model="form.projectName" placeholder="选填项"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" style="width: 420px">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
import cfg from '../service/cfg'
import { lstorage } from '../utils/storage.js'
import { Message } from 'element-ui'
import { mapActions } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
      form: {
        name: '',
        projectName: '',
        clusterId: ''
      },
      clusterList: null,
      rules: {
        clusterId: [
          { required: true, message: '请选择所属集群', trigger: 'change' }
        ],
        name: [
          { required: true, message: '接口名称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
  },
  methods: {
    ...mapActions('detail', [
      'changeShowStatus'      // 重置展示列表或对象参数
    ]),
    ...mapActions('create', [
      'newRequest'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitAjax()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * 提交请求
     */
    submitAjax () {
      let parame = this.form
      let callback = (data) => {
        if (data) {
          if (data.code === 0) {
            let id = data.data.id
            this.$router.push({name: 'detail', params: { id: id }})
          } else {
            Message.warning(data.message)
          }
        }
      }
      this.newRequest({parame, callback})
    }
  },
  component: {
    Message
  }
}
</script>
<style lang="scss" scoped>
@import '../style/page/layout.scss';
.form-s {
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  min-height: 500px;
}
</style>
