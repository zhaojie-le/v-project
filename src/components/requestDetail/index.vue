<template>
  <!-- 接口详情 -->
  <div class="content-box">
    <!-- 接口头部信息展示 -->
    <template>
      <el-button type="primary" size="medium" style="float: right" v-if="!edit" @click="editEvent">编辑</el-button>
      <el-button type="success" size="medium" style="float: right" v-if="edit" @click="saveEvent">保存</el-button>
      <r-message
        :edit="edit"
        :request-mes="requestMes"
        :requestid="requestid"
        :server-cluster="clusterList"
        v-if="requestMes"
        v-model="nowMes"
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
      <div class="content-item">
        <p class="title-head">接口说明</p>
        <el-input v-model="requestMes.remark" :disabled="edit" type="textarea" :rows="3" style="width: 970px; margin-left: 31px;"></el-input>
      </div>
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
      edit: false,
      callback: 'callback',
      clusterList: null,
      nowMes: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
    this.nowMes = this.requestMes
  },
  computed: {
    ...mapState('detail', [
      'requestMes',                   // 接口详情，请求方式等
      'requestEdit'         // 接口编辑－数据参数
    ]),
    changeRemark () {
      if (!this.requestMes.remark) {
        return ''
      } else {
        return this.requestMes.remark
      }
    }
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
    RResponse
  },
  watch: {
    requestMes: {
      handler: function (newVal, oldVal) {
        console.log('=============', this.requestMes)
      },
      deep: true
    }
  }
}
</script>
<style lang='scss'>
@import '../../style/page/content';
  .content-box{
    min-height: 600px;
    font-size: 13px;
    color: #525a66;
  }

</style>

