<template>
<div>
  <el-row v-for="(item, index) in list" :key="index">
    <el-col :span="5">
      <el-input placeholder="属性名称"></el-input>
    </el-col>
    <el-col :span="5">
      <el-input placeholder="属性值"></el-input>
    </el-col>
    <el-col :span="2">
      <i class="el-icon-remove-outline" style="margin-left: 20px" @click="deleteClick(list, item, index)"></i>
    </el-col>
  </el-row>
  <el-button size="mini">+</el-button>
</div>
</template>
<script>
export default {
  props: {
    objStr: {
      type: String
    }
  },
  data () {
    return {
      list: [{key:'',val:''}]
    }
  },
  created () {

  },
  methods: {
    objStrToArray (str) {
      let arr = []
      if (!str) {return arr}

    },
    deleteClick (list, item, index) {
      list.splice(index, 1)
      return list
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
