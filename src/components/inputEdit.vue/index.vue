<template>
  <div>
    <template v-if="edit">
      <el-row v-for="(item, index) in nowList" :key="index">
        <el-col :span="6">
          <el-input placeholder="属性名称" v-model="item.key"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="属性值" v-model="item.value"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="deleteEvent(nowList, index)">-</el-button>
          <el-button @click="addEvent()">+</el-button>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <el-row v-for="(item, index) in nowList" :key="index">
        <el-col :span="6">
          <span>{{item.key}}</span>
        </el-col>
        <el-col :span="6">
          <span>{{item.value}}</span>
        </el-col>
      </el-row>
    </template>
  </div>

</template>
<script>
export default {
  props: {
    obj: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nowList: null,
      listItem: {
        key: '',
        value: ''
      }
    }
  },
  created () {
    this.nowList = this.objectStrToArray(this.obj)
  },
  methods: {
    deleteEvent (index) {
      console.log('index',index)
      // this.nowList.splice(index, 1)
    },
    addEvent () {
      console.log('add')
      console.log('nowList', this.nowList)
      this.nowList.push(this.listItem)
    },
    // 将对象字符串转换为数组
    objectStrToArray (str) {
      let arr = []
      if(!str) {return arr.push(this.listItem)}
      console.log('0')
      let obj = JSON.parse(str)
      for (let key in obj) {
        let objItem = {}
        objItem.key = key
        objItem.value = obj.key ? obj.key : ''
        arr.push(objItem)
      }
      return arr;
    },
    // 数组转换为对象字符串
    arrayToObjectStr (arr) {
      let obj = {}
      if (!arr) {
        return ''
      }
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if(item.key){
          obj[item.key] = item.value ? item.value : ''
        }
      }
      return obj
    }
  },
  watch: {
    nowList: {
      handler: function () {
        console.log('watchList', this.nowList)
        let string = this.arrayToObjectStr(this.nowList)
        this.$emit('input', string)
      },
      deep: true
    }
  }
}
</script>
<style lang="sass" scoped>

</style>


