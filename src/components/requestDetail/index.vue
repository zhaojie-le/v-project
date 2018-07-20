<template>
  <!-- 接口详情 -->
  <div class="content-box">
    <!-- 接口头部信息展示 -->
    <template>
      <el-button type="primary" size="small" class="btn" v-if="!edit" @click="editEvent">接口编辑</el-button>
      <el-button type="success" size="small" class="btn" v-if="edit" @click="saveEvent">接口保存</el-button>
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
        :plist="reqParamesTransform"
        v-if="reqParames"
        v-model="requestParameterList"
        >
      </r-paramter>
      <r-response
        :edit="edit"
        :rlist="reqResponseTransform"
        v-if="reqResponse"
        v-model="responseParameterList"
        >
      </r-response>
      <!-- <div class="content-item">
        <p class="title-head">mock接口数据</p>
        <div>{{mockResponse}}</div>
      </div> -->
    </template>
  </div>
</template>
<script>
import API from '../../service/API'
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../../utils/storage'
import RMessage from './edit/message'
import RParamter from './edit/paramter'
import RResponse from './edit/response'
import ArrChange from '../../utils/arrayChange'
import formatJson from '../../utils/formatJson'
// import TestRequest from './edit/testRequest'
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
      reqParamesTransform: null,
      reqResponseTransform: null,
      mockResponse: null
    }
  },
  created () {
    this.clusterList = lstorage.get('clusterList') ? lstorage.get('clusterList') : null
    this.nowMes = this.requestMes
    if(this.reqParames){
      this.reqParamesTransform = ArrChange.arrayRefEntityToStr(this.reqParames)
    }
    if(this.reqResponse) {
      this.reqResponseTransform = ArrChange.arrayRefEntityToStr(this.reqResponse)
    }
  },
  computed: {
    ...mapState('detail', [
      'requestMes',                   // 接口详情，请求方式等
      'reqParames',
      'reqResponse'
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
      this.requestParameterList = ArrChange.arrayRefEntityToNumber(this.requestParameterList)
      this.responseParameterList = ArrChange.arrayRefEntityToNumber(this.responseParameterList)
      let parame = Object.assign(this.requestMes,
        {requestParameterList: this.requestParameterList ? this.requestParameterList : this.reqParames},
        {responseParameterList: this.responseParameterList ? this.responseParameterList : this.reqResponse})
      let callback = (data) => {
        if (data.code !== 0) {
          Message.error(data.message)
        } else {
          this.edit = !this.edit
          Message.success('保存成功')
          // 跳列表页
          // this.$router.push({name: 'list'})
        }
      }
      this.editRequest({parame, callback})
    },
    getMock (){
      let that = this
      let url = API.PATH+'/api/mock/'+ this.requestMes.clusterId + this.requestMes.requestUrl
      console.log('url',url)
      this.$axios.get(url)
        .then(function (response) {
          console.log(response);
          that.mockResponse = formatJson(JSON.stringify(response.data))
          console.log('mockResponse',this.mockResponse)
        })
        .catch(function (error) {
          console.log(error);
        });
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
        // this.reqParames = ArrChange.arrayRefEntityToStr(this.requestMes.requestParameterList)
        // this.reqResponse = ArrChange.arrayRefEntityToStr(this.requestMes.responseParameterList)
      },
      deep: true
    },
    reqParames: {
      handler: function () {
        this.reqParamesTransform = ArrChange.arrayRefEntityToStr(this.reqParames)
      },
      deep: true
    },
    reqResponse: {
      handler: function () {
        this.reqResponseTransform = ArrChange.arrayRefEntityToStr(this.reqResponse)
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
  .btn{
    float: right;
    margin-right: 18px;
  }
</style>

