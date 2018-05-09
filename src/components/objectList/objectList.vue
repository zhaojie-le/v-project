<template>
  <div class="content-body">
    <!-- 列表项 -->
    <!-- @current-change="handleCurrentChange" -->
    <el-table
      :data="objectData.list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="对象名称"
        >
      </el-table-column>
      <el-table-column
        prop="clusterName"
        label="所属集群"
        >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        >
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleCurrentChange(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand">
      <template slot-scope="props" v-if="props.row.propertyList">
        <el-form label-position="left" inline class="demo-table-expand" label="内部属性">
          <el-form-item v-for="(item, index) in props.row.propertyList" :key="index">
            <span>{{ item.identifier }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="objectData.pagination.rowCount"
      :current-page="page"
      class="pagination-box"
      @current-change="currentChange"
      >
    </el-pagination>
  </div>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    objectData: {
      type: Object
    }
  },
  data () {
    return {
      list: null
    }
  },
  computed: {
    ...mapState('list', [
      'page',
      'pageNum',
      'listParam',
      'allListNum'
    ])
  },
  created () {
    console.log('list', this.objectList)
  },
  methods: {
    ...mapActions('detail', [
    ]),
    ...mapActions('list', [
      'changePage',
      'objectList'        // 获取对象列表
    ]),
    /**
     * 点击对象列表，跳转接口详情页
     * @param {object} item 接口信息
     */
    toDetail (item) {
      // 跳转详情页
      this.$router.push({name: 'objdel', params: { id: item.id }})
    },
    handleCurrentChange (val) {
      this.toDetail(val)
    },
    getList (num) {
      let page = {
        page: num,
        pageNum: this.pageNum
      }
      let parame = Object.assign({}, this.form, page)
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        }
      }
      this.objectList({parame, callback})
    },
    // 页码切换
    currentChange (val) {
      this.changePage(val)
      this.getList(val)
    },
    handleDeleteClick (item) {
      console.log(item.id)
      this.openMessage()
    },
    deleteEvent (id) {
      let parame = {
        requestId: id
      }
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        } else {
          // 重新请求
          this.getList(this.page)
        }
      }
      this.deleteRequest({parame, callback})
    },
    openMessage (id) {
      MessageBox.confirm('此操作将永久删除该对象, 是否继续?', '提示', {
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
    Message,
    MessageBox
  },
  watch: {
    objectData: {
      handler: function (newVal, oldVal) {
        this.list = this.objectData.list
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.pagination-box{
  float: right;
  margin-top: 20px;
}
</style>
