<template>
  <el-main style="min-height: 800px">
    <el-container>
      <el-aside width="250px" class="aside">
        <el-button size="small" type="primary" @click="NewClick">新建接口</el-button>
        <el-row :gutter="20" style="line-height: 32px;margin-top: 20px;" v-show="requestList&&requestList.length > 0">
          <el-col :span="17">
            <el-input
              size="mini"
              placeholder="接口名称"
              v-model="requestName">
            </el-input>
          </el-col>
          <el-col :span="2">
            <i class="icon el-icon-search" @click="searchEvent"></i>
          </el-col>
          <el-col :span="2">
            <i class="icon el-icon-close" @click="emptyEvent"></i>
          </el-col>
        </el-row>

        <ul class="ul-wrap">
          <li
            :class="{select: inx === index}"
            :key="index"
            v-for="(item, index) in requestList"
            @click="changeReuqest(item,index)"
          >
            <i class="el-icon-delete" style="margin-right: 10px" @click="handleDeleteClick(item)"></i>
            {{item.name}}
          </li>
        </ul>
      </el-aside>
      <el-main style="padding: 0 20px">
        <!-- 接口详情模块 -->
        <img class="nodata" v-show="requestList&&requestList.length === 0"  src="../../static/imgs/zanwushuju.png"/>
        <request-content :requestid="parseInt(id)" v-show="requestList&&requestList.length > 0"></request-content>
      </el-main>
    </el-container>
    <dialog-new
      :id="id"
      :genre="'request'"
      :show="newDialogShow"
      v-if="newDialogShow"
      @closed="closeDialog"
    ></dialog-new>
  </el-main>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../utils/storage'
import DialogNew from './requestDetail/dialogNew'
import RequestContent from '../components/requestDetail/index'
export default {
  data () {
    return {
      clusterId: 0,             // 集群id
      requestName: '',
      inx: 0,
      newDialogShow: false
    }
  },
  created () {
    this.id = this.$route.params.id || lstorage.get('id')
    this.clusterId = lstorage.get('clusterId') || this.$route.params.id
    // this.getRequestDetail(this.id)
    this.getList()
  },
  computed: {
    ...mapState('list', [
      'requestList'           // 项目列表
    ]),
    ...mapState('detail', [
      'requestid'             // 接口id
    ])
  },
  methods: {
    ...mapActions('list', [
      'getRequestList'
    ]),
    ...mapActions('detail', [
      'getRequest',             // 获取接口信息
      'deleteRequest'
    ]),
    ...mapActions('create', [
      'newRequest'
    ]),
    /**
     * 获取接口详情数据
     * @param {number} id
     */
    getRequestDetail (id) {
      let parame = {
        id: id,
        number: new Date()
      }
      let callback = (data) => {
        if (data) {
          if (data.code !== 0) {
            // 报错信息，toast提示
            Message.error(data.message)
          }
        }
      }
      this.getRequest({parame, callback})
    },
    getList () {
      let parame = {
        name: this.requestName,
        clusterId: this.clusterId
      }
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        } else {
          let list = data.data.list
          if (list.length > 0){
            this.inx = 0
            let item = list[0]
            this.getRequestDetail(item.id)
          }
        }
      }
      this.getRequestList({parame, callback})
    },
    changeReuqest(item,index){
      this.inx = index
      this.getRequestDetail(item.id)
    },
    searchEvent () {
      this.getList()
    },
    emptyEvent () {
      this.requestName = ''
      this.getList()
    },
    NewClick () {
      this.newDialogShow = true
    },
    // 关闭弹层
    closeDialog () {
      this.newDialogShow = false
      this.getList()
    },
    // 删除
    handleDeleteClick (item) {
      this.openMessage(item.id)
    },
    // 删除接口请求
    deleteEvent (id) {
      let parame = {
        id: id
      }
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        } else {
          // 重新请求列表数据
          this.getList()
        }
      }
      this.deleteRequest({parame, callback})
    },
    openMessage (id) {
      MessageBox.confirm('此操作将永久删除该接口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除接口
        this.deleteEvent(id)
      }).catch(() => {
      })
    }
  },
  components: {
    DialogNew,
    RequestContent
  }
}
</script>
<style lang="scss" scoped>
.ul-wrap{
  font-size: 14px;
  color: #606266;
  li{
    cursor:pointer;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select{
    color: #409EFF
  }
}
.icon{
  cursor:pointer;
}
.aside{
  border-right: 1px solid rgb(241, 245, 247);
  overflow: hidden;
}
.nodata{
  display: block;
  width: 200px;
  margin: 0 auto;
}
</style>
