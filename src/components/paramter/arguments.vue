<template>
  <div class="table-wrap">
    <items :list="list" v-model="list" :edit="edit" :entity="entity"></items>
    <el-button size="mini" @click="addParamter" style="margin-top: 10px" v-if="edit">添加参数</el-button>
  </div>
</template>
<script>
import Items from './item'
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [{
          "dataType": "",
          "dataTypeId": "",
          "extra": "",
          "id": "",
          "identifier": "",
          "refEntity": {},
          "refEntityId": "",
          "refPropertyId": "",
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
    }
  },
  created () {
    console.log('argumentsssssssssss', this.list)
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
      console.log('index', index)
      let nowArr = this.deleteArray(this.list, index)
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
        "dataType": "",
        "dataTypeId": "",
        "extra": "",
        "id": "",
        "identifier": "",
        "refEntity": {},
        "refEntityId": "",
        "refPropertyId": "",
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
      console.log('nowArr', nowArr)
    },
    // 增加子节点按钮
    addItemObject (index) {
      console.log('子节点index', index)
      var aa = this.addArrayItem(this.list, index)
      console.log('aa', aa)
    },
    // 在固定位置后增加复杂类型的子项
    addArrayItem (arr, index) {
      let item = {
        identifier: '',        // 变量名
        value: '',             // 模拟数据
        remark: '',            // 备注
        dataType: '',
        id: '',
        refEntityId: '',
        restriction: '',
        values: '',
        action: 0,
        extra: null
      }
      let nowIndex = index + 1
      arr[nowIndex] = index
      return arr.splice(nowIndex, 0, item)
    }
  },
  components: {
    Items
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.list)
        console.log('999999', this.list)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-wrap{
    margin: 20px;
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
