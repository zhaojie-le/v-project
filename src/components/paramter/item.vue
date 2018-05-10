<template>
<div>
  <div v-for="(item, index) in list" :key="index">
    <div>
      <div>
        <el-row type="flex" justify="space-around" :class="[isItem ? 'row-item-bg':'row-bg']">
          <el-col :span="5">
            <div class="grid-content">
              <el-input size="mini" placeholder="名称" v-model="item.identifier" :disabled="!edit"></el-input>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <!-- <el-input size="mini" placeholder="类型" v-model="item.dataType"></el-input> -->
              <el-select
                :disabled="!edit"
                v-model="item.dataType"
                placeholder="选择字段类型"
                filterable
                size="mini"
                style="width: 100%"
                v-if="dataTypeList"
              >
              <div v-if="entity">
                <el-option
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                  :disabled="item.name ==='object' || item.name === 'array'"
                  v-for="item in dataTypeList">
                </el-option>
              </div>
              <div v-else>
                <el-option
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                  v-for="item in dataTypeList">
                </el-option>
              </div>
              </el-select>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <!-- 正常参数 -->
              <el-input size="mini" placeholder="mock规则" v-model="item.restriction" v-if="item.dataType !== 'object'" :disabled="!edit"></el-input>
            <!-- 关联对象 -->
              <el-select
                v-model="item.id"
                placeholder="关联对象"
                filterable
                size="mini"
                style="width: 94%"
                :disabled="!edit"
                v-if="item.dataType === 'object' && clusterList"
              >
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in clusterList">
                </el-option>
              </el-select>
              <el-tooltip effect="dark" content="新建对象" placement="bottom-start" v-show="item.dataType === 'object' && edit" >
                <i class="el-icon-circle-plus-outline icon-position" @click="newIcon"></i>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content">
              <el-input size="mini" placeholder="备注" v-model="item.remark" :disabled="!edit"></el-input>
            </div>
          </el-col>
          <el-col :span="1" style="line-height: 28px" v-show="edit">
            <!-- 删除节点 -->
            <i class="el-icon-remove-outline" style="margin-right: 10px" @click="deleteClick(list, item, index)"></i>
            <!-- 复杂数据增加子节点按钮 -->
            <el-tooltip effect="dark" content="添加子节点" placement="bottom-start" v-show="item.dataType === 'array' && item.refEntityId !== 0 " >
              <i class="el-icon-circle-plus-outline" @click="addItemObject(list, item,index)"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
      <!-- 复杂类型 -->
      <template v-if="item.refEntity">
        <items :list="item.refEntity.propertyList" :is-item="true"></items>
      </template>
      <!-- 简单类型 -->
      <template v-if="item.refProperty">
        <!-- <items :list="item.refProperty" :is-item="true" :edit="edit"></items> -->
        <obj-item :item="item.refProperty"></obj-item>
      </template>
    </div>
  </div>
  <new-object-dialog :show="showObjDialog" v-if="showObjDialog" @closed="closeDialog"></new-object-dialog>
</div>
</template>
<script>
// var type = [
//   {
//     name: 'string',
//     id: '1'
//   },
//   {
//     name: 'number',
//     id: '2'
//   },
//   {
//     name: 'boolean',
//     id: '3'
//   },
//   {
//     name: 'array',
//     id: '4'
//   },
//   {
//     name: 'object',
//     id: '5'
//   },
//   {
//     name: 'generic', // 范型
//     id: '9'
//   }
// ]
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import NewObjectDialog from '../newObjectDialog/index'
import ObjItem from './objitem'
export default {
  name: 'items',
  props: {
    list: {
      type: Array
    },
    isItem: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    isGeneric: {
      type: Number
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
      // type: type,
      additem: {
        "dataType": "",
        "dataTypeId": "",
        "extra": "",
        "id": "",
        "identifier": "",
        "refEntityId": "",
        "refPropertyId": "",
        "remark": "",
        "restriction": "",
        "values": "",
        "refProperty": [],
        "refEntity": {
          "propertyList": []
        }
      },
      showObjDialog: false
    }
  },
  created () {
    this.getObject()
    this.dataTypeAjax()
  },
  computed: {
    ...mapState('list', [
      'clusterList'
    ]),
    ...mapState('detail', [
      'objectP',
      'dataTypeList'
    ])
  },
  methods: {
    ...mapActions('list', [
      'objectList'
    ]),
    ...mapActions('detail', [
      'getDataType',
      'resetObjectP'
    ]),
    // 获取字段类型
    dataTypeAjax () {
      let parame = {
        isGeneric: 0
      }
      let callback = (data) => {
        if (data.code !==0) {
          Message.warning(data.message)
        }
      }
      this.getDataType({parame, callback})
    },
    // 关闭弹层
    closeDialog () {
      this.showObjDialog = false
    },
    // 点击新建对象icon
    newIcon () {
      this.showObjDialog = true
    },
    // 删除按钮事件
    deleteClick (list, item, index) {
      list.splice(index, 1)
      return list
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
    // 增加子节点按钮
    addItemObject (list, item, index) {
      console.log('addddd',list,item,index)
      if (item.refEntity) {
        console.log('sssss')
        if(item.refEntity.propertyList){
          item.refEntity.propertyList.splice(0,0,this.additem)
        } else {
          item.refEntity.propertyList = []
          item.refEntity.propertyList.splice(0,0,this.additem)
        }

      } else if (item.refProperty) {
        console.log('aaaaaaaaa')
        // item.refProperty.splice(0,0,this.additem)
      }

    }
  },
  components: {
    ObjItem,
    NewObjectDialog
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        // this.$emit('input', this.list)
        this.resetObjectP(this.list)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .row-bg {
    padding: 5px 0;
    background-color: #d3dce6;
  }
  .row-item-bg {
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
  .icon-position{
    position: absolute;
    top: 18px;
    margin-left: 5px;
  }

</style>
