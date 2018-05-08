<template>
  <div class="form-box">
    <el-form :model="form" ref="form" label-width="80px" size="mini">
      <el-form-item label="所属集群" prop="serverClusterId">
        <el-select  v-model="form.serverClusterId" placeholder="请选择接口所属集群" filterable size="mini" style="width: 100%">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id" 
            v-for="item in list">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="对象名称" prop="objectName">
        <el-input v-model="form.objectName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState, mapActions } from 'vuex'
import ProductList from '../../components/requestList/productList'
export default {
  name: 'list',
  data () {
    return {
      _params: null,      // 列表切换请求参数
      form: {
        objectName: '',
        serverClusterId: ''
      }
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  created () {
    this.getObjectList()
  },
  computed: {
    ...mapState('list', [
      'page',
      'pageNum',
      'listParam'           // 列表请求参数
    ])
  },
  methods: {
    ...mapActions('list', [
      'changePage',
      'objectList',    // 获取接口列表
      'changeListParam'
    ]),
    /**
     * 获取列表项
     * @param {object} parame 请求参数对象
     * 初始时参数值均为200，默认返回全部项目数据
     */
    getObjectList () {
      let page = {
        page: this.page,
        pageNum: this.pageNum
      }
      let parame = Object.assign({}, this.form, page)
      let callback = (data) => {
        if (data.code !== 0) {
          Message.warning(data.msg)
        } else {
          this.changeListParam(this.form)
          this.changePage(1)
        }
      }
      this.objectList({parame, callback})
    },
    onSubmit () {
      let v = this.form
      if (v.project || v.requestName || v.serverClusterId) {
        this.getObjectList()
      } else {
        Message.warning('搜索项不能为空')
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
    Message,
    ProductList
  }
}
</script>
<style scoped lang="scss">
.form-box{
  width: 500px;
  margin: 20px 0 20px 0;
}
</style>
