<template>
  <el-dialog title="新建对象" :visible.sync="dialogShow">
    <el-form :model="form" label-width="80px" size="mini">
      <el-form-item label="实体名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="所属集群" :label-width="formLabelWidth" v-if="clusterList">
        <el-select  v-model="form.serverClusterId" placeholder="请选择接口所属集群" filterable size="mini" style="width: 100%">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in clusterList">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary">下一步</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { lstorage } from '../../utils/storage'
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
        name: '',
        clusterId: ''
      },
      clusterList: null,
      dialogShow: false
    }
  },
  created () {
    this.clusterList = lstorage.get('infoData') ? lstorage.get('infoData').serverClusterList : null
    this.dialogShow = this.show
  },
  methods: {
    closeDialog () {
      this.dialogShow = false
      this.$emit('closed')
    }
  },
  watch: {

  }
}
</script>
<style lang="sass" scoped>

</style>


