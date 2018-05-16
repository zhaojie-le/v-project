<template>
  <!-- 接口详情 -->
  <div class="content-box" v-if="objectData">
    <!-- 接口头部信息展示 -->
    <!-- <template> -->
      <el-button type="primary" size="medium" style="float: right" v-if="!edit" @click="editEvent">编辑</el-button>
      <el-button type="success" size="medium" style="float: right" v-if="edit" @click="saveEvent">保存</el-button>
      <el-form label-width="90px" size="mini" style="width: 800px; padding: 0px 20px;">
        <el-form-item label="对象名称">
          <el-input v-model="objectData.name" :disabled="!edit"></el-input>
        </el-form-item>
        <el-form-item label="所属集群" v-if="clusterList" prop="clusterId">
          <el-select  v-model="objectData.clusterId" placeholder="对象所属集群" filterable size="mini" style="width: 100%" :disabled="!edit">
            <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in clusterList">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对象说明">
          <el-input v-model="objectData.remark" type="textarea" :rows="2" :disabled="!edit"></el-input>
        </el-form-item>
      </el-form>
      <div class="table-box">
        <p>参数编辑</p>
        <arguments
          :edit="edit"
          :entity="true"
          :list="objectData.propertyList"
          v-if="objectData.propertyList"
          v-model="objectData.propertyList"
        ></arguments>
      </div>
    <!-- </template> -->
  </div>
</template>
<script>
import { Message } from 'element-ui'
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
    }
    // objectData: {
    //   type: Object
    // }
  },
  data () {
    return {
      edit: false,
      clusterList: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
    console.log('------------', this.objectData)
  },
  computed: {
    ...mapState('detail', [
      'objectData',
      'objectP'
    ])
  },
  methods: {
    ...mapActions('detail', [
      'editObjectDetail'
    ]),
    editObjectAjax () {
      let parame = this.objectData
      parame.propertyList = this.objectP
      let callback = (data) => {
        if (data.code === 0) {
          // success
        } else {
          Message.error(data.message)
        }
      }
      this.editObjectDetail({parame, callback})
    },
    editEvent () {
      this.edit = !this.edit
    },
    saveEvent () {
      this.edit = !this.edit
      this.editObjectAjax()
    }
  },
  components: {
    Arguments
  },
  watch: {
    objectData: {
      handler: function (newVal, oldVal) {
        console.log('sss-------', this.objectData)
      },
      deep: true
    }
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
    p{
      font-size: 14px;
      margin-left: 20px;
    }
  }
</style>

