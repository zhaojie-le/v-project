<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <div>
        <div>
          <el-row type="flex" justify="space-around" :class="[isItem ? 'row-item-bg':'row-bg']">
            <el-col :span="5">
              <div class="grid-content">
                <el-input size="mini" placeholder="名称" v-model="item.identifier" :disabled="!edit" :style="'width:'+ (110 - nowCount * 5) +'%;'" style="float: right"></el-input>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content">
                <!-- <el-input size="mini" placeholder="类型" v-model="item.dataType"></el-input> -->
                <el-select
                  v-if="dataTypeList"
                  :disabled="!edit"
                  v-model="item.dataType"
                  placeholder="选择字段类型"
                  filterable
                  size="mini"
                  style="width: 100%"
                >
                <div>
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
                <el-tooltip placement="top" v-if="edit">
                  <div slot="content" v-if="item.dataType === 'number'">
                    +1: 数值默认+1<br/>
                    min-max: 生成一个min-max 间的整数<br/>
                  </div>
                  <div slot="content" v-if="item.dataType === 'string'">
                    count: 重复count次字符串<br/>
                    min-max: 重复min-max次字符串<br/>
                  </div>
                  <div slot="content" v-if="item.dataType === 'boolean'">
                    1: true,false各1/2的概率<br/>
                    min-max: true 的概率为min / (min + max)<br/>
                  </div>
                  <div slot="content" v-if="item.dataType === 'array'">
                    count: 重复count次属性值<br/>
                    min-max: 重复min-max次属性值<br/>
                  </div>
                  <div slot="content"><a href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification" style="color: #fff">更多mock规则</a></div>
                  <el-input
                    size="mini"
                    placeholder="1-5"
                    v-model="item.restriction"
                    v-if="item.dataType !== 'object'"
                    :disabled="!edit"
                  ></el-input>
                </el-tooltip>
                <div v-else>
                  <el-input
                    size="mini"
                    placeholder="1-5"
                    v-model="item.restriction"
                    v-if="item.dataType !== 'object'"
                    :disabled="!edit"
                  ></el-input>
                </div>
              <!-- 关联对象 -->
                <el-select
                  v-model="item.refEntityId"
                  placeholder="关联实体"
                  filterable
                  size="mini"
                  style="width: 94%"
                  :disabled="!edit"
                  v-if="objData && item.dataType === 'object'"
                  @change="selectChange(item)"
                >
                  <el-option
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="entityId === item.id"
                    v-for="item in objData">
                    <span style="float: left">{{ item.name }}</span>
                    <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.clusterName }}</span> -->
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
              <el-tooltip effect="dark" content="添加子节点" placement="bottom-start" v-show="item.dataType === 'array'" >
                <i class="el-icon-circle-plus-outline" @click="addItemEvent(item,index)"></i>
              </el-tooltip>
            </el-col>
            <!-- 必须选项 -->
            <el-col :span="1" style="line-height: 28px">
              <el-switch
                v-model="item.required"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :width=27
                active-value="1"
                inactive-value="0">
              </el-switch>
            </el-col>
          </el-row>
        </div>
        <!-- 复杂类型 -->
        <template v-if="item.refEntity && !edit&&item.dataType !== 'array'">
          <items :list="item.refEntity.propertyList" :is-item="true" v-if="item.refEntity.propertyList" :count="nowCount"></items>
        </template>
        <!-- 简单类型 -->
        <template v-if="item.refProperty&&item.dataType === 'array'">
          <!-- <items :list="item.refProperty" :is-item="true" :edit="edit"></items> -->
          <obj-item :item="item.refProperty" :edit="edit&&item.dataType === 'array'" :count="nowCount+1"></obj-item>
        </template>
      </div>
    </div>
    <new-object-dialog :show="showObjDialog" v-if="showObjDialog" @closed="closeDialog"></new-object-dialog>
  </div>
</template>
<script>

import { Message } from 'element-ui'
import { lstorage } from '../../utils/storage'
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
    },
    count: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // type: type,
      additem: {
        dataType: "string",
        dataTypeId: 0,
        extra: "",
        id: "",
        identifier: "",
        refEntityId: '',
        refPropertyId: 0,
        remark: "",
        restriction: "",
        values: "",
        required:1,
        refProperty: {},
        refEntity: {
          // "propertyList": []
        }
      },
      showObjDialog: false,
      nowCount: 0,
      entityId: 0,
      clusterId: 0
    }
  },
  created () {
    this.getObject()
    this.dataTypeAjax()
    if (this.count) {
      this.nowCount = this.count + 1
    }
    this.entityId = lstorage.get('id') ? lstorage.get('id') : 0
  },
  computed: {
    ...mapState('list', [
      'clusterList',
      'objData'
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
        clusterId: lstorage.get('clusterId')
      }
      let callback = (data) => {
        if (data.code !==0){
          Message.warning(data.message)
        }
      }
      this.objectList({parame, callback})
    },
    // 增加子节点按钮
    // addItemEvent (item, index) {
    //   if (item.refEntity) {
    //     console.log('sssss')
    //     if(item.refEntity.propertyList){
    //       item.refEntity.propertyList.splice(0,0,this.additem)
    //     } else {
    //       item.refEntity.propertyList = []
    //       item.refEntity.propertyList.splice(0,0,this.additem)
    //     }
    //   } else if (item.refProperty) {
    //     console.log('aaaaaaaaa')
    //     // item.refProperty.splice(0,0,this.additem)
    //   }
    // }
    addItemEvent (item, index) {
      item = Object.assign({},item, {refProperty: this.additem})
      this.$emit('changeItem', item, index)
    },
    selectChange(item) {
      item.refEntity = {}
    }
  },
  components: {
    ObjItem,
    NewObjectDialog
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.list)
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
