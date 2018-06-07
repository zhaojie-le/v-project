<template>
    <div class="content-box">
      <el-button type="primary" size="medium" class="btn" v-if="from === 'list' && !edit" @click="editEvent">编辑</el-button>
      <el-button type="success" size="medium" class="btn" v-if="from === 'list' && edit" @click="saveEvent">保存</el-button>
      <el-form :model="form" ref="form" label-width="90px" size="mini" :rules="rules" style="margin-top: 30px;">
        <el-form-item label="集群名称" prop="name">
          <el-input v-model="form.name" :disabled="!edit"></el-input>
        </el-form-item>
        <el-form-item label="集群域名" prop="host">
          <el-input v-model="form.host" :disabled="!edit"></el-input>
        </el-form-item>
        <el-form-item label="cookie" prop="cookie">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入cookie内容"
            v-model="form.cookie"
            :disabled="!edit"
            ></el-input>
        </el-form-item>
        <el-form-item label="header" prop="header">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入header内容"
            v-model="form.header"
            :disabled="!edit"
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
            :edit="edit"
            :data-type="dataTypeList"
            v-model="form.responseTemplate"
            :object-string="form.responseTemplate"
          ></template-edit>
        </el-form-item>
      </el-form>
      <el-button
        v-if="from === 'new'"
        type="primary" 
        size="medium" 
        style="float: right"  
        @click="submitForm('form')"
      >立即创建</el-button>
    </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import TemplateEdit from './template'
export default {
  props: {
    from: {
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
      },
      edit: false
    }
  },
  created () {
    this.dataTypeAjax()
    if (this.from === 'new') {
      this.edit = true
    } else {
      this.getClusterAjax()
    }
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
      'getDataType',
      'getCluster',
      'editCluster'
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
    },
    editEvent () {
      this.edit = !this.edit
    },
    saveEvent () {
      this.editClusterAjax()
      this.edit = !this.edit
    },
    getClusterAjax () {
      let parame = {
        id: lstorage.get('clusterId') || 0
      }
      let callback = (data) => {
        if (data.code !== 0) {
          Message.error(data.message)
        } else {
          this.form = data.data
        }
      }
      this.getCluster({parame, callback})
    },
    editClusterAjax () {
      let parame = this.form
      let callback = (data) => {
        if (data.code !==0){
          Message.error(data.message)
        } else {
          this.$router.push({name: 'clulist'})
        }
      }
      if (this.checkResponseTemplate() && this.checkoutName()){
        this.editCluster({parame, callback})
      }
    },
    checkoutName () {
      if (this.form.name) {
        return true
      } else {
        Message.error('集群名称不能为空')
        return false
      }
    }
  },
  components: {
    TemplateEdit
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  padding: 20px 50px;
}
.btn{
  float: right;margin-top: -20px;
}
</style>

