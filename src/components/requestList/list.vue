<template>
  <div class="content-body">
    <!-- 列表项 -->
    <!-- @current-change="handleCurrentChange" -->
    <el-table
      :data="requestList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="接口名称"
        >
      </el-table-column>
      <el-table-column
        prop="requestUrl"
        label="接口url"
        >
      </el-table-column>
      <el-table-column
        prop="clusterName"
        label="所属集群"
        >
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="所属项目"
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

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageData.rowCount"
      :page-size="10"
      :current-page="page"
      class="pagination-box"
      @current-change="currentChange"
      v-if="pageData"
      >
    </el-pagination>
  </div>
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapState('list', [
      'pageData',             // 接口页码
      'requestList'           // 项目列表
    ])
  },
  methods: {
    ...mapActions('detail', [
      'deleteRequest'
    ]),
    ...mapActions('list', [
      'changePage',
      'getRequestList'
    ]),
    /**
     * 点击接口列表，跳转接口详情页
     * @param {object} item 接口信息
     */
    toDetail (item) {
      // 跳转详情页
      this.$router.push({name: 'detail', params: { id: item.id }})
    },
    handleCurrentChange (val) {
      this.toDetail(val)
    },
    getList (num) {
      let page = {
        page: num,
        pageSize: 20
      }
      let parame = Object.assign({}, this.form, page)
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        }
      }
      this.getRequestList({parame, callback})
    },
    // 页码切换后
    currentChange (val) {
      this.changePage(val)
      this.getList(val)
    },
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
          this.getList(this.page)
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
    Message,
    MessageBox
  }
}
</script>
<style scoped lang="scss">
.pagination-box{
  float: right;
  margin-top: 20px;
}
</style>
