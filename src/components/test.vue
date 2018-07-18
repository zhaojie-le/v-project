<template>
  <div>
    test
    <li v-for="(item,index) in list" :key="index">{{item}}</li>
    <el-input
      v-model="msg">
    </el-input>
    <el-button @click="clickEvent">发送</el-button>
  </div>
</template>
<script>
const socket = io(API.PATH,{
  path: '/test',
  reconnection:false,
  // autoConnect:false,
  forceNew: true
});
import API from '../service/API'
// const socket = io(API.PATH);
export default {
  data () {
    return {
      list: [],
      msg:''
    }
  },
  created () {
  },
  methods: {

    clickEvent () {
      this.list.push(this.msg)
      this.msg = ''
      socket.emit('sendRequest', this.msg)

      // socket.on('msg', function (data){
      //   console.log(data);
      //   socket.emit('other', {
      //     my: 'data',
      //     time: Date.parse(new Date()) / 1000 //时间
      //   }); // emit an event to the socket
      // });
      // socket.on('disconnect', () => {
      //   socket.open();
      // });
    }
  }

}
</script>
<style lang="scss" scoped>

</style>
