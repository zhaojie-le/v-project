<template>
  <el-dialog title="新建" :visible.sync="dialogShow" @close="closeDialog" width="40%">
    <el-form :model="form" label-width="80px" size="mini" :rules="rules" ref="form">
      <el-form-item label="接口名称" :label-width="formLabelWidth" prop="name" v-if="genre === 'request'">
        <el-input v-model="form.name" auto-complete="off" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="实体名称" :label-width="formLabelWidth" prop="name" v-if="genre === 'entity'">
        <el-input v-model="form.name" auto-complete="off" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="nextEvent('form')">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import { Message } from 'element-ui'
import { lstorage } from '../../utils/storage'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    genre: {
      type: String
    }
  },
  data () {
    return {
      formLabelWidth: '100px',
      form: {
        name: ''
      },
      clusterList: null,
      dialogShow: false,
      rules: {
        name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ]
      },
      propertyList: null
    }
  },
  created () {
    this.dialogShow = this.show
  },
  methods: {
    ...mapActions('create',[
      'newRequest',
      'newObject'
    ]),
    ...mapActions('list', [
      'requestList'
    ]),
    // 新建对象提交
    newRequestAjax (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let parame = {
            clusterId: this.id,
            name: this.form.name
          }
          let callback = (data) => {
            if (data.code === 0) {
              // success--重新请求列表接口
              this.closeDialog()
            } else {
              Message.error(data.message);
            }
          }
          if (this.genre === 'request') {
            this.newRequest({parame, callback})
          }
          if (this.genre === 'entity') {
            this.newObject({parame, callback})
          }
        } else {
          return false;
        }
      })
    },
    closeDialog () {
      this.dialogShow = false
      this.$emit('closed')
    },
    nextEvent (form) {
      this.newRequestAjax(form)
    }
  },
  watch: {

  }
}
</script>
<style lang="sass" scoped>

</style>
