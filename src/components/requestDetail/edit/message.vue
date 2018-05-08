<template>
   <!-- 接口头部信息编辑 -->
  <div class="content-item">
    <p class="title-head">接口详情</p>
    <el-form label-width="80px" size="mini" style="min-width: 800px;padding: 0 20px">
      <el-form-item label="请求方式">
        <el-radio v-model="requestMes.requestMethod" label="GET" :disabled="edit">GET</el-radio>
        <el-radio v-model="requestMes.requestMethod" label="POST" :disabled="edit">POST</el-radio>
      </el-form-item>
      <el-form-item label="请求类型">
        <el-radio v-model="requestMes.responseType" label="AJAX" :disabled="edit">AJAX</el-radio>
        <el-radio v-model="requestMes.responseType" label="JSONP" :disabled="edit">JSONP</el-radio>
      </el-form-item>
      <el-form-item label="回调函数">
        <el-input v-model="requestMes.callback" @change="limitCallback" :disabled="edit"></el-input>
      </el-form-item>
      <el-form-item label="接口名称">
        <el-input v-model="requestMes.name" :disabled="edit"></el-input>
      </el-form-item>
      <el-form-item label="请求路径">
        <el-input v-model="requestMes.requestUrl" @change="limitRequestUrl" placeholder="路径必须以／开头" :disabled="edit"></el-input>
      </el-form-item>
      <el-form-item label="所属集群">
        <!-- <el-input v-model="requestMes.serverCluster" @change="limitServerCluster" :readonly="true"></el-input> -->
        <el-select  
          v-model="requestMes.clusterName" 
          placeholder="请选择接口所属集群" 
          filterable 
          size="mini" 
          style="width: 100%"
          :disabled="edit"
          >
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id" 
            v-for="item in serverCluster">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="header">
        <el-input v-model="requestMes.header" :disabled="edit" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="cookie">
        <el-input v-model="requestMes.cookie" :disabled="edit" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { lstorage } from '../../../utils/storage'
// import { mapActions, mapState } from 'vuex'
export default {
  props: {
    requestMes: {
      type: Object
    },
    requestid: {
      type: Number
    },
    serverCluster: {
      type: Array
    },
    edit: Boolean
  },
  data () {
    return {
      mockPath: '',                 // mock链接的域名
      requestId: '',                 // 接口的id
      requestType: 'get',
      requestWay: 'ajax',
      serverClusterId: ''
    }
  },
  created () {
    this.mockPath = window.json2fe && window.json2fe.requestPath
  },
  methods: {
    // 限制输入路径的规范
    limitRequestUrl () {
      let str = this.requestMes.requestUrl
      // str = str.replace(/[^\\/\w\\/]/ig, '')
      str = str.replace(/[^\w\-\\_\\/\\.\\/]/ig, '') // 只允许输入字母，数字，下划线和中划线 '.' ／
      if (str.startsWith('/')) {
        this.requestMes.requestUrl = str
      } else {
        str = '/' + str
        console.log(11)
      }
      this.requestMes.requestUrl = str
    },
    // 限制所属集群输入规范
    limitServerCluster () {
      let str = this.requestMes.serverCluster
      // str = str.replace(/[^\w\-\\_\\/]/ig, '')  // 只允许输入字母，数字，下划线和中划线
      str = str.replace(/^[^a-zA-Z]/, '')          // 只能字母开头
      this.requestMes.serverCluster = str
    },
    // 限制输入callback，只能字母
    limitCallback () {
      let str = this.requestMes.callback
      str = str.replace(/^[^a-zA-Z]/, '')
      this.requestMes.callback = str
    },
    // 编辑按钮点击事件
    editEvent () {
      this.isEdit = true
      // 同步mockMesEditStatus状态，改为2代表处于编辑状态
      this.changeMockMesEdit(2)
    },
    // 保存按钮点击事件
    saveEvent () {
      this.checkParamter()
    },
    /**
     * 提交前填写参数校验提示
     * @event saveEdit
     */
    checkParamter () {
      if (!this.requestMes.requestName) {
        let mes = '接口名称不能为空'
        this.$emit('openToast', mes)
      } else if (!this.requestMes.requestUrl) {
        let mes = '接口路径不能为空'
        this.$emit('openToast', mes)
      } else if (!this.requestMes.serverCluster) {
        let mes = '接口集群名不能为空'
        this.$emit('openToast', mes)
      } else {
        // 成功提交
        this.saveEdit()
      }
    },
    /**
     * 模块点击保存后，触发该保存提交事件
     * @event againGetRequest callback
     * @event editRequest vuex
     */
    saveEdit () {
      let _parame = {
        requestMes: this.requestMes
      }
      let info = {
        requestId: this.requestid
      }
      let parame = Object.assign(info, _parame)
      // 提交成功返回函数
      let callback = (data) => {
        if (data.code === 0) {
          // 成功返回
          // 请求接口数据
          this.isEdit = false
          this.againGetRequest()
          // 同步mockMesEditStatus状态，改为1代表处于展示状态
          this.changeMockMesEdit(1)
        } else {
          let mes = data.msg
          this.$emit('openToast', mes)
        }
      }
      this.editRequest({parame, callback})
    },
    /**
     * 提交保存后，重新请求接口数据
     */
    againGetRequest () {
      let parame = {
        requestId: this.requestid
      }
      let callback = (data) => {
        if (data.code === 0) {
          // 成功返回
          this.resetRequestMes(data)
        } else {
          let mes = data.msg
          this.$emit('openToast', mes)
        }
      }
      this.getRequest({parame, callback})
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../../../style/page/content';
// .title-head{
//   font-size: 16px;
//   line-height: 40px;
//   font-weight: bold;
// }
</style>
