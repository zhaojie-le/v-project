<template>
  <el-form size="mini" label-width="80px" style="width: 800px">
    <el-row v-for="(item, index) in dataArr" :key="index">
      <el-col :span="8">
        <el-form-item label="变量名称" >
          <el-input v-model="item.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="选择类型" >
          <el-select v-model="item.dataType" placeholder="请选择">
            <el-option
              v-for="item in dataType"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2" style="line-height: 28px">
        <i class="el-icon-remove-outline" style="margin-left: 20px" @click="deleteClick(dataArr, item, index)"></i>
      </el-col>

    </el-row>
    <el-form-item label="模版说明">
      <p style="font-size: 12px;color: red;width: 500px">集群模版代表集群下接口默认返回的外层统一结构，其中只能有一个字段是范型，如默认模版中的data字段，选择类型为generic；状态码为number类型；状态信息为string类型</p>
    </el-form-item>
    <el-button size="mini" @click="addTemplateItem(dataArr)" style="margin-left: 10px">+</el-button>
  </el-form>
</template>
<script>
let dataInfo = [
  {
    name: 'code',
    dataType: 'number'
  },
  {
    name: 'data',
    dataType: 'generic'
  },
  {
    name: 'message',
    dataType: 'string'
  }
]
import { mapState } from 'vuex'
export default {
  props: {
    dataType: {
      type: Array
    },
    objectString: {
      type: String
    }
  },
  data () {
    return {
      value: '',
      dataArr: dataInfo,
      objStr:'',
      dataItem: {
        name: '',
        dataType: ''
      }
    }
  },
  created () {
    this.objStr = this.arrayToObject(this.dataArr)
    this.$emit('input', this.objStr)
    // this.objStrToArray()
  },
  methods: {
    deleteClick (list, item, index) {
      list.splice(index, 1)
      return list
    },
    addTemplateItem (list) {
      list.push(this.dataItem)
    },
    arrayToObject (list) {
      if(!list) {return}
      let obj = {}
      for (let i = 0;i < list.length; i++){
        let item = list[i]
        let key = item.name
        let type = item.dataType
        if (key) {
          if (type === 'number') {
            obj[key] = 0
          }
          if (type === 'string') {
            obj[key] = 'success'
          }
          if (type === 'generic') {
            obj[key] = 'generic'
          }
          if (type === 'boolean') {
            obj[key] = true
          }
          if (type === 'object') {
            obj[key] = {}
          }
          if (type === 'array') {
            obj[key] = []
          }
        }
      }
      return JSON.stringify(obj)
    },
    objStrToArray (str) {
      let arr = []
      if(!str) {return arr}
      let obj = JSON.parse(str)
      for (let key in obj) {
        let item = {}
        item.name = key
        item.dataType = obj[key]
        arr.push(item)
      }
      return arr
    }
  },
  watch: {
    dataArr: {
      handler: function () {
        this.objStr = this.arrayToObject(this.dataArr)
        this.$emit('input', this.objStr)
      },
      deep: true
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
