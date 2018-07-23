<template>
  <div class="content-item">
    <p class="title-head">接口测试</p>
    <div class="cont-box">
      <p>请求参数</p>
      <el-input
        type="textarea"
        :rows="10"
        v-model="test">
      </el-input>
    </div>
    <el-row :gutter="20" style="margin:0 10px">
      <el-col :span="17">
        <div style="position: relative">
          <el-input
            size="mini"
            placeholder="测试URI"
            v-model="getUrl"
            >
          </el-input>
          <i class="el-icon-circle-close input-del" @click="inputDel"></i>
        </div>
      </el-col>
      <el-col :span="5" style="line-height: 30px">
          <el-radio v-model="radio" label="GET">GET</el-radio>
          <el-radio v-model="radio" label="POST" style="margin-left: 11px">POST</el-radio>
      </el-col>
      <el-col :span="2">
        <el-button size="mini" type="primary" plain>测试</el-button>
      </el-col>
    </el-row>


    <div class="box">
      <div class="item">
        <p>测试接口返回数据</p>
        <el-input
          type="textarea"
          :rows="10"
          v-model="test">
        </el-input>
      </div>
      <div class="item" style="margin-left: 5px;">
        <p>定义接口返回数据</p>
        <el-input
          type="textarea"
          :rows="10"
          v-model="test">
        </el-input>
      </div>
    </div>

    <div class="cont-box">
      <p>比对结果</p>
      <el-input
        type="textarea"
        :rows="10"
        v-model="test">
      </el-input>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: 'GET',
      getUrl: '',
      test: ''
    }
  },
  methods: {
    inputDel () {
      this.getUrl = ''
    },
    checkUrl () {

    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../../style/page/content';
.input-del{
  position: absolute;
  right: 5px;
  top: 9px;
  cursor: pointer;
}
.cont-box{
  margin: 20px;
  p{
    margin-bottom: 10px;
  }
}
.box{
  display: flex;
  margin: 20px;
}
.item{
  flex: 1;
  p{
    margin-bottom: 10px;
  }
}
</style>
