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
        :plist="reqParames"
        v-if="reqParames"
        v-model="requestParameterList"
        >
      </r-paramter>
      <r-response
        :edit="edit"
        :rlist="reqResponse"
        v-if="reqResponse"
        v-model="responseParameterList"
        >
      </r-response>
      <!-- <div class="content-item">
        <p class="title-head">接口说明</p>
        <el-input v-model="requestMes.remark" :disabled="!edit" type="textarea" :rows="3" style="width: 970px; margin-left: 31px;"></el-input>
      </div> -->
    </template>
  </div>
</template>
<script>
import { Message } from 'element-ui'
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
      nowMes: this.requestMes,
      requestParameterList: null,
      responseParameterList: null,
      reqParames: null,
      reqResponse: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
    this.nowMes = this.requestMes
  },
  computed: {
    ...mapState('detail', [
      'requestMes'                   // 接口详情，请求方式等
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
    ...mapActions('detail', [
      'editRequest'
    ]),
    editEvent () {
      this.edit = !this.edit
    },
    saveEvent () {
      this.editAjax()
    },
    editAjax () {
      let parame = Object.assign(this.requestMes,
        {requestParameterList: this.requestParameterList ? this.requestParameterList : this.reqParames},
        {responseParameterList: this.responseParameterList ? this.responseParameterList : this.reqResponse})
      let callback = (data) => {
        if (data.code !== 0) {
          Message.error(data.message)
        } else {
          this.edit = !this.edit
          Message.success('保存成功')
        }
      }
      this.editRequest({parame, callback})
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
        this.reqParames = this.requestMes.requestParameterList
        this.reqResponse = this.requestMes.responseParameterList
      },
      deep: true
    },

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

