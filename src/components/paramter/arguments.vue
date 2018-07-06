<template>
  <div class="table-wrap">
    <el-row type="flex" justify="space-around" style="background: #f1f2f6">
      <el-col :span="5" v-for="(item, index) in tableTitle" :key="index">
        <p style="line-height: 35px; margin-left: 13px;margin-bottom: 5px" >{{item.title}}</p>
      </el-col>
    </el-row>
    <items :list="list" v-model="list" :edit="edit" :entity="entity" @changeItem="changeItem" :count="nowCount"></items>
    <el-button size="mini" @click="addParamter" style="margin-top: 10px" v-if="edit">添加参数</el-button>
  </div>
</template>
<script>
var tableTitle = [{title: '变量名'},{title: '变量类型'},{title:'mock规则'},{title:'备注'}]
import Items from './item'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [{
          "dataType": "string",
          "dataTypeId": 0,
          "extra": "",
          "id": "",
          "identifier": "",
          "refEntity": {},
          "refEntityId": '',
          "refPropertyId": 0,
          "refProperty": {},
          "remark": "",
          "restriction": "",
          "values": ""
        }]
      }
    },
    edit: {
      type: Boolean,
      default: false
    },
    entity: {  // 是否是新建实体，新建实体时只是简单类型
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // nlist: this.list
      item: {
        id: '',
        identifier: '',        // 变量名
        value: '',             // 模拟数据
        remark: '',            // 备注
        dataType: '',
        dataTypeId: 0,
        refEntityId: 0,
        restriction: '',
        refProperty: null,
        values: '',
        action: 0,
        extra: null
      },
      nowCount: 1,
      tableTitle: tableTitle
    }
  },
  computed: {
    ...mapState('list', [
      'objData'
    ])
  },
  methods: {
    ...mapActions('list', [
      'objectList'
    ]),
    // 子组件触发删除事件
    deleteChange (index) {
      let nowArr = this.deleteArray(this.list, index)
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
        "dataType": "string",
        "dataTypeId": 0,
        "extra": "",
        "id": "",
        "identifier": "",
        "refEntity": {},
        "refEntityId": 0,
        "refPropertyId": 0,
        "refProperty": null,
        "remark": "",
        "restriction": "",
        "values": ""
      }
      let nowArr = arr.push(item)
      return nowArr
    },
    // 数组增加行
    addParamter () {
      let nowArr = this.addArray(this.list)
      return nowArr
    },
    // 增加子节点按钮
    addItemObject (index) {
      var aa = this.addArrayItem(this.list, index)
    },
    // 在固定位置后增加复杂类型的子项
    addArrayItem (arr, index) {
      // let item = {
      //   id: '',
      //   identifier: '',        // 变量名
      //   value: '',             // 模拟数据
      //   remark: '',            // 备注
      //   dataType: '',
      //   dataTypeId: 0,
      //   refEntityId: 0,
      //   restriction: '',
      //   refProperty: null,
      //   values: '',
      //   action: 0,
      //   extra: null
      // }
      let nowIndex = index + 1
      arr[nowIndex] = index
      return arr.splice(nowIndex, 0, this.item)
    },
    changeItem (item, index) {
      this.list.splice(index, 1, item)
    }
  },
  components: {
    Items
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.list)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-wrap{
    margin: 0 20px 20px 20px;
  }
  .row-bg {
    padding: 5px 0;
    background-color: #f9fafc;
  }
  .el-row {
    &:first-child {
      padding-top: 10px;
    }
    &:last-child {
      padding-bottom: 10px;
    }
  }

</style>
