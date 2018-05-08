<template>
<div>
  <el-row type="flex" justify="space-around" :class="[isItem ? 'row-item-bg':'row-bg']">
    <el-col :span="5">
      <div class="grid-content">
          <el-input size="mini" placeholder="名称" v-model="item.identifier"></el-input>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
      <!-- <el-input size="mini" placeholder="类型" v-model="item.dataType"></el-input> -->
        <el-select  v-model="item.dataType" placeholder="选择字段类型" filterable size="mini" style="width: 100%">
        <el-option
          :key="item.name"
          :label="item.name"
          :value="item.name"
          v-for="item in type">
        </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
        <!-- 正常参数 -->
        <el-input size="mini" placeholder="mock规则" v-model="item.restriction" v-if="item.dataType !== 'object'"></el-input>
        <!-- 关联对象 -->
        <el-select  v-model="item.refEntityId" placeholder="关联对象" filterable size="mini" style="width: 94%" v-if="item.dataType === 'object' && objData">
        <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in objData.list">
        </el-option>
        </el-select>
        <el-tooltip effect="dark" content="新建对象" placement="bottom-start" v-show="item.dataType === 'object'" >
        <i class="el-icon-circle-plus-outline icon-position"></i>
        </el-tooltip>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content">
          <el-input size="mini" placeholder="备注" v-model="item.remark"></el-input>
      </div>
    </el-col>
    <el-col :span="1" style="line-height: 28px">
      <!-- 删除节点 -->
      <i class="el-icon-remove-outline" style="margin-right: 10px" @click="deleteClick(list, item, index)"></i>
    </el-col>
  </el-row>
</div>
</template>
<script>
var type = [
  {
    name: 'string',
    id: '1'
  },
  {
    name: 'number',
    id: '2'
  },
  {
    name: 'boolean',
    id: '3'
  },
  {
    name: 'array',
    id: '4'
  },
  {
    name: 'object',
    id: '5'
  },
  {
    name: 'generic', // 范型
    id: '9'
  }
]
export default {
  props: {
    item: {
      type: Object
    }
  },
  created () {
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
