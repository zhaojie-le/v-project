<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        <el-form>
      <template>
    <el-table-column> -->
    <el-table-column label="变量名称" prop="identifier">
      <template slot-scope="scope">
        <el-input size="mini" placeholder="请输入内容" v-model="tableData[scope.$index].identifier"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="类型" prop="dataType">
      <template slot-scope="scope" v-if="dataTypeList">
        <el-select  v-model="tableData[scope.$index].dataType" placeholder="选择字段类型" filterable size="mini" style="width: 100%">
          <el-option
            :key="item.name"
            :label="item.name"
            :value="item.name" 
            v-for="item in dataTypeList">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="值" prop="value">
      <template slot-scope="scope">
        <el-input size="mini" placeholder="请输入值" v-model="tableData[scope.$index].value" v-if="tableData[scope.$index].dataType !== 'object'"></el-input>
        <el-select  v-model="tableData[scope.$index].refEntityId" placeholder="关联对象" filterable size="mini" style="width: 100%" v-if="tableData[scope.$index].dataType === 'object' && objData">
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id" 
            v-for="item in objData.list">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="mock规则" prop="restriction">
      <template slot-scope="scope">
        <el-input size="mini" placeholder="请输入mock规则" v-model="tableData[scope.$index].restriction"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="备注" prop="remark">
      <template slot-scope="scope">
        <el-input size="mini" placeholder="请输入备注内容" v-model="tableData[scope.$index].remark"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="" label="编辑">
        <template slot-scope="scope">
          <!-- <el-button @click="handleCurrentChange(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button @click="handleDeleteClick(scope.row, scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <el-button size="small" @click="addParamter" style="margin: 13px 10px">增加字段</el-button>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  // model: {
  //   prop: 'tableData',
  //   event: 'dataChange'
  // },
  props: {
    isGeneric: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return [{
          'identifier': null,
          'value': null,
          'remark': null,
          'dataType': null,
          'restriction': null
        }]
      }
    }
  },
  data () {
    return {
      // tableData: [
      //   {
      //     'identifier': 'id',      // 变量名
      //     'value': '',             // 模拟数据
      //     'remark': '',       // 备注
      //     'dataType': 'string',
      //     'restriction': '',           // mockjs 的约束条件，例：'name|min-max.dmin-dmax' 中 '|'后面的部分
      //     'refEntityId': ''
      //   }, {
      //     'identifier': 'name',      // 变量名
      //     'value': '',             // 模拟数据
      //     'remark': '',       // 备注
      //     'dataType': 'array',
      //     'restriction': ''           // mockjs 的约束条件，例：'name|min-max.dmin-dmax' 中 '|'后面的部分
      //   }, {
      //     'identifier': 'age',      // 变量名
      //     'value': '',             // 模拟数据
      //     'remark': '',       // 备注
      //     'dataType': '',
      //     'restriction': '1-100'
      //   }
      // ],
      type: '',
      tableData: null
    }
  },
  created () {
    this.getData()
    this.getObject()
    this.tableData = this.list
  },
  computed: {
    ...mapState('detail', [
      'dataTypeList'
    ]),
    ...mapState('list', [
      'objData'
    ])
  },
  methods: {
    ...mapActions('detail', [
      'getDataType'
    ]),
    ...mapActions('list', [
      'objectList'
    ]),
    getData () {
      let parame = {
        isGeneric: this.isGeneric
      }
      let callback = (data) => {
        console.log('datatype', data)
      }
      this.getDataType({parame, callback})
    },
    // 删除行
    handleDeleteClick (item, inx) {
      console.log('inx', inx)
      let nowArr = this.deleteArray(this.tableData, inx)
      console.log('arr', nowArr)
    },
    // 删除数组下标为inx的项
    deleteArray (arr, inx) {
      if (arr && arr.length > 0) {
        let list = arr
        list.splice(inx, 1)
        return list
      }
    },
    // 数组后增加一项
    addArray (arr) {
      let item = {
        identifier: '',        // 变量名
        value: '',             // 模拟数据
        remark: '',            // 备注
        dataType: '',
        constraint: ''
      }
      let nowArr = arr.push(item)
      return nowArr
    },
    // 数组增加行
    addParamter () {
      let nowArr = this.addArray(this.tableData)
      console.log(nowArr)
    },
    // 获取对象列表
    getObject () {
      let parame = {
        page: 1,
        pageSize: 20
      }
      let callback = (data) => {
        console.log(data)
      }
      this.objectList({parame, callback})
    },
    dataChangeEvent () {
      this.$emit('input', this.tableData)
    }
  },
  watch: {
    tableData: {
      handler: function (newVal, oldVal) {
        this.dataChangeEvent()
        console.log('tableData')
      },
      deep: true
    }
  }
}
</script>
<style>
</style>
