<template>
  <!-- 接口详情 -->
  <div class="content-box">
    <!-- 接口头部信息展示 -->
    <!-- <template> -->
      <el-button type="primary" size="medium" style="float: right" v-if="edit" @click="editEvent">编辑</el-button>
      <el-button type="success" size="medium" style="float: right" v-if="!edit" @click="saveEvent">保存</el-button>
      <el-form label-width="90px" size="mini" style="width: 800px; padding: 0px 20px;">
        <el-form-item label="对象名称">
          <el-input v-model="objectData.name" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="对象说明">
          <el-input v-model="objectData.remark" type="textarea" :rows="2" :disabled="edit"></el-input>
        </el-form-item>
      </el-form>
      <div class="table-box">
        <arguments :list="objectData.propertyList" v-if="objectData.propertyList"></arguments>
      </div>
    <!-- </template> -->
  </div>
</template>
<script>
// import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import Arguments from '../paramter/arguments'
export default {
  props: {
    requestid: {
      type: Number
    },
    isDetail: {
      type: Number
    },
    objectData: {
      type: Object
    }
  },
  data () {
    return {
      edit: true,
      clusterList: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
  },
  computed: {
    ...mapState('detail', [
    ])
  },
  methods: {
    ...mapActions('detail', []),
    editEvent () {
      this.edit = !this.edit
    },
    saveEvent () {
      this.edit = !this.edit
    }
  },
  components: {
    Arguments
  }
}
</script>
<style lang='scss'>
  .content-box{
    min-height: 600px;
    font-size: 13px;
    color: #525a66;
  }
  .table-box{
    padding-top: 50px;
  }
</style>

