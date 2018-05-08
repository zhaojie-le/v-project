<template>
  <!-- 接口详情 -->
  <div class="content-box">
    <!-- 接口头部信息展示 -->
    <template>
      <el-button type="primary" size="medium" style="float: right" v-if="edit" @click="editEvent">编辑</el-button>
      <el-button type="success" size="medium" style="float: right" v-if="!edit" @click="saveEvent">保存</el-button>
      <r-message 
        :edit="edit"
        :request-mes="requestMes"
        :requestid="requestid" 
        :server-cluster="infoData.serverClusterlist"
        v-if="requestMes"
        >
      </r-message>
      <r-paramter
        :edit="edit"
        :plist="requestMes.requestParameterList" 
        v-if="requestMes"
        >
      </r-paramter>                                                                                                                                                                                                                                                                                           
      <r-response
        :edit="edit"  
        :rlist="requestMes.responseParameterList"
        v-if="requestMes"
        >
      </r-response>
      <r-mark></r-mark>
    </template>
  </div>
</template>
<script>
// import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import RMessage from './edit/message'
import RParamter from './edit/paramter'
import RResponse from './edit/response'
import RMark from './edit/mark'
export default {
  props: {
    requestid: {
      type: Number
    },
    isDetail: {
      type: Number
    }
  },
  data () {
    return {
      edit: true,
      callback: 'callback',
      infoData: null
    }
  },
  created () {
    this.infoData = lstorage.get('infoData') ? lstorage.get('infoData') : null
  },
  computed: {
    ...mapState('detail', [
      'requestMes',                   // 接口详情，请求方式等
      'requestEdit'         // 接口编辑－数据参数
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
    RMessage,
    RParamter,
    RResponse,
    RMark
  }
}
</script>
<style lang='scss'>
  .content-box{
    min-height: 600px;
    font-size: 13px;
    color: #525a66;
  }
</style>

