<template>
<div>
  <el-row type="flex" justify="space-around" class="row-item-bg">
    <el-col :span="5">
      <div class="grid-content">
        <el-input size="mini" placeholder="名称" v-model="item.identifier" :disabled="!edit" :style="'width:'+ (110 - count * 5) +'%;'" style="float: right"></el-input>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
      <!-- <el-input size="mini" placeholder="类型" v-model="item.dataType"></el-input> -->
        <el-select  v-model="item.dataType" placeholder="选择字段类型" filterable size="mini" style="width: 100%" v-if="dataTypeList" :disabled="!edit">
          <el-option
            :key="item.name"
            :label="item.name"
            :value="item.name"
            v-for="item in dataTypeList">
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
        <!-- 正常参数 -->
        <el-input size="mini" placeholder="mock规则" v-model="item.restriction" v-if="item.dataType !== 'object'" :disabled="!edit"></el-input>
        <!-- 关联对象 -->
        <el-select
          v-model="item.refEntityId"
          placeholder="关联实体"
          filterable
          size="mini"
          style="width: 94%"
          v-if="objData && item.dataType === 'object'" :disabled="!edit"
        >
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in objData">
            <span style="float: left">{{ item.name }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.clusterName }}</span> -->
          </el-option>
        </el-select>
        <el-tooltip effect="dark" content="新建对象" placement="bottom-start" v-show="item.dataType === 'object' && edit" >
          <i class="el-icon-circle-plus-outline icon-position"></i>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
        <el-input size="mini" placeholder="备注" v-model="item.remark" :disabled="!edit"></el-input>
      </div>
    </el-col>
    <!--   -->
  </el-row>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      type: Object
    },
    edit: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState('detail', [
      'dataTypeList'
    ]),
    ...mapState('list', [
      'clusterList',
      'objData'
    ]),
  },
  methods: {
  },
  watch: {
    item: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.item)
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
