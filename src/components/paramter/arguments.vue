<template>
  <div class="table-wrap">
    <!-- <items
      :item="item"
      v-for="(item, index) in nlist"
      :key="index"
      :index="index"
      @delete="deleteChange"
    ></items> -->
    <items :list="nlist"></items>
    <el-button size="mini" @click="addParamter" style="margin-top: 10px">添加参数</el-button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Items from './item'
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
    }
  },
  data () {
    return {
      nlist: this.list
    }
  },
  created () {
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
      let nowArr = this.deleteArray(this.nlist, index)
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
      let nowArr = this.addArray(this.nlist)
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
  }
}
</script>
<style lang="scss" scoped>
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
