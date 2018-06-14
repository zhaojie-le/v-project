<template>
  <el-dialog title="新建接口" :visible.sync="dialogShow" @close="closeDialog">
    <el-form :model="form" label-width="80px" size="mini" :rules="rules" ref="form">
      <el-form-item label="接口名称" :label-width="formLabelWidth" prop="name">
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
import { lstorage } from '../../utils/storage'
import { Message } from 'element-ui'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
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
      'newRequest'
    ]),
    ...mapActions('list', [
      'objectList'
    ]),
    // 新建对象提交
    newObjectAjax (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let parame = this.form
          let callback = (data) => {
            if (data.code === 0) {
              // success--重新请求接口
              this.closeDialog()
            } else {
              Message.error(data.message);
            }
          }
          this.newObject({parame, callback})
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
      this.newObjectAjax(form)
    }
  },
  watch: {

  }
}
</script>
<style lang="sass" scoped>

</style>
