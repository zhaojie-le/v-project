<template>
  <div class="content-item">
    <p class="title-head">接口测试</p>
    <el-row :gutter="20" style="margin-left: 10px">
      <el-col :span="18">
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
      <el-col :span="6" style="line-height: 30px">
          <el-radio v-model="radio" label="GET">GET</el-radio>
          <el-radio v-model="radio" label="POST">POST</el-radio>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: 'GET',
      getUrl: ''
    }
  },
  methods: {
    inputDel () {
      this.getUrl = ''
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
</style>
