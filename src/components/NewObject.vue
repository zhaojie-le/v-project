<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/object' }">对象列表页</el-breadcrumb-item>
      <el-breadcrumb-item>新建对象页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" label-width="90px" size="mini" class="form-s" :rules="rules" ref="form">
      <el-form-item
        label="所属集群"
        prop="clusterId"
      >
        <el-select  v-model="form.clusterId" placeholder="请选择对象所属集群" filterable size="mini" style="width: 100%" v-if="clusterList">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in clusterList">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="对象名称"
        prop="name"
      >
        <el-input v-model="form.name" placeholder="输入对象名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')" style="width: 410px">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
import { Message } from 'element-ui'
import { mapActions } from 'vuex'
import { lstorage } from '../utils/storage.js'
export default {
  name: 'list',
  data () {
    return {
      form: {
        name: '',
        clusterId: ''
      },
      clusterList: null,
      rules: {
        clusterId: [
          { required: true, message: '请选择集群', trigger: 'change' }
        ],
        name: [
          { required: true, message: '对象名称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
  },
  methods: {
    ...mapActions('detail', [
      'newRequest',
      'changeRequestId'
    ]),
    ...mapActions('create', [
      'newObject'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitAjax()
        } else {
          return false
        }
      })
      // console.log(this.form)
      // if (!this.form.serverClusterId) {
      //   Message.warning('所属集群不能为空')
      // } else if (!this.form.objectName) {
      //   Message.warning('对象名称不能为空')
      // } else {
      //   // 提交
      //   this.submitAjax()
      // }
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
            this.$router.push({name: 'objdel', params: { id: id }})
          } else {
            Message.warning(data.msg)
          }
        }
      }
      this.newObject({parame, callback})
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
