<template>
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
            :disabled="true"
            ></el-input>
        </el-form-item>
        <el-form-item label="模版编辑">
          <template-edit
            :data-type="dataTypeList"
            v-model="form.responseTemplate"
            :object-string="form.responseTemplate"
          ></template-edit>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="medium" style="float: right"  @click="submitForm('form')">立即创建</el-button>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import TemplateEdit from './template'
export default {
  props: {
    form: {
      type: String
    }
  },
  data () {
    return {
      infoData: null,
      form: {
        host: '',
        name: '',
        header: '',
        cookie: '',
        responseTemplate: ''
        // responseTemplate: JSON.stringify(obj)
      },
      responseTemplate: null,
      rules: {
        name: [
          { required: true, message: '请输入集群名称', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.dataTypeAjax()
  },
  computed: {
    ...mapState('detail', [
      'dataTypeList'
    ])
  },
  methods: {
    ...mapActions('list', [
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
        if (!valid) {
          return false
        }
        if (this.checkResponseTemplate()){
          this.submitAjax()
        }
      })
    },
    checkResponseTemplate () {
      if (this.form.responseTemplate.indexOf("generic") !== -1) {
        return true
      } else {
        Message.error('模版输入不符合规范')
        return false
      }
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
    },
    dataTypeAjax () {
      let parame = {
        "isGeneric":1
      }
      let callback = (data) =>{
        if (data.code !==0){
          Message.error(data.message)
        }
      }
      this.getDataType({parame, callback})
    }
  },
  components: {
    TemplateEdit
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  padding: 40px 50px;
}
</style>

