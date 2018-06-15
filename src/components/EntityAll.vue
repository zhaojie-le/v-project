<template>
  <el-main>
    <el-container>
      <el-aside width="250px" style="border-right: 1px solid rgb(241, 245, 247);">
        <el-button size="small" type="primary" @click="NewClick">新建实体</el-button>
        <el-row :gutter="20" style="line-height: 32px;margin-top: 20px;">
          <el-col :span="17">
            <el-input
              size="mini"
              placeholder="实体名称"
              v-model="name">
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
            v-for="(item, index) in objData"
            @click="changeReuqest(item,index)"
          >{{item.name}}</li>
        </ul>
        <ul v-show="!objData">没有数据</ul>
      </el-aside>
      <el-main style="padding: 0 20px">
        <!-- 接口详情模块 -->
        <entity-content :object-data="objectData"></entity-content>
      </el-main>
    </el-container>
    <dialog-new
      :id="id"
      :genre="'entity'"
      :show="newDialogShow"
      v-if="newDialogShow"
      @closed="closeDialog"
    ></dialog-new>
  </el-main>
</template>
<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import { lstorage } from '../utils/storage'
import DialogNew from './requestDetail/dialogNew'
import EntityContent from '../components/objectDetail/index'
export default {
  data () {
    return {
      id: 0,             // 集群id
      name: '',
      inx: 0,
      newDialogShow: false
    }
  },
  created () {
    this.id = this.$route.params.id || lstorage.get('id')
    // this.getRequestDetail(this.id)
    lstorage.set('id', this.id)
    this.getList()
  },
  computed: {
    ...mapState('list', [
      'objData'               // 列表
    ]),
    ...mapState('detail', [
      'objectData'               // 列表
    ])

  },
  methods: {
    ...mapActions('list', [
      'objectList'
    ]),
    ...mapActions('detail', [
      'objectDetail'             // 获取接口信息
    ]),
    ...mapActions('create', [
      'newObject'
    ]),
    /**
     * 获取详情数据
     * @param {number} id
     */
    getDetail (id) {
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
      this.objectDetail({parame, callback})
    },
    getList () {
      let parame = {
        name: this.name,
        clusterId: this.id
      }
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        } else {
          let list = data.data.list
          if (list.length > 0){
            this.inx = 0
            let item = list[0]
            this.getDetail(item.id)
          }
        }
      }
      this.objectList({parame, callback})
    },
    submitNewAjax () {
      let parame = this.form
      let callback = (data) => {
        if (data) {
          if (data.code === 0) {
            let id = data.data.id
            this.$router.push({name: 'detail', params: { id: id }})
          } else {
            Message.warning(data.message)
          }
        }
      }
      this.newRequest({parame, callback})
    },
    changeReuqest (item,index) {
      this.inx = index
      this.getDetail(item.id)
    },
    searchEvent () {
      this.getList()
    },
    emptyEvent () {
      this.name = ''
      this.getList()
    },
    NewClick () {
      this.newDialogShow = true
    },
    // 关闭弹层
    closeDialog () {
      this.newDialogShow = false
      this.getList()
    }
  },
  components: {
    DialogNew,
    EntityContent
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
  }
  .select{
    color: #409EFF
  }
}
.icon{
  cursor:pointer;
}
</style>
