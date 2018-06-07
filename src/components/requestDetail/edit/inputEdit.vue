<template>
<div style="width: 700px">
  <el-row v-for="(item, index) in list" :key="index" style="margin: 5px 0;">
    <el-col :span="7">
      <el-input placeholder="属性名称" v-model="item.key"></el-input>
    </el-col>
    <el-col :span="7">
      <el-input placeholder="属性值" v-model="item.val" style="margin-left: 7px;"></el-input>
    </el-col>
    <el-col :span="1">
      <i class="el-icon-remove-outline" style="margin-left: 20px" @click="deleteClick(list, item, index)"></i>
    </el-col>
    <el-col :span="1">
      <i class="el-icon-circle-plus-outline" style="margin-left: 20px" @click="addItem(list)"></i>
    </el-col>
  </el-row>
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
    if (this.objStr) {
      this.list = this.objStrToArray(this.objStr)
    }
  },
  methods: {
    objStrToArray (str) {
      let arr = []
      if (!str) {
        arr = this.list
        return arr
      }
      let json = JSON.parse(str)
      for(let key in json) {
        let item = {key:'',val:''}
        item.key = key
        item.val = json[key]
        arr.push(item)
      }
      return arr
    },
    ArrayToObjStr (arr) {
      let str = ''
      if (!arr) {
        return str
      }
      let obj = {}
      for (let i=0; i<arr.length; i++) {
        let item = arr[i]
        obj[item.key] = item.val
      }
      str = JSON.stringify(obj)
      return str
    },
    deleteClick (list, item, index) {
      list.splice(index, 1)
      return list
    },
    addItem(list) {
      let objItem = {key:'',val:''}
      this.list.push(objItem)
    }
  },
  watch : {
    objStr: function () {
      this.list = this.objStrToArray(this.objStr)
    },
    list: {
      handler: function () {
        let resStr = this.ArrayToObjStr(this.list)
        this.$emit('input', resStr)
      },
      deep: true
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
