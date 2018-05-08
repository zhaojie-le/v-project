<template>
  <div class="content-item">
    <p class="title-head">接口说明</p>
    <el-input v-model="remark" :disabled="disabled" type="textarea" :rows="3" style="width: 970px; margin-left: 31px;"></el-input>
  </div> 
</template>
<script>
export default {
  data () {
    return {
      remark: '',
      disabled: false
    }
  },
  methods: {
    getR () {
      console.log('par', this.remark)
    }
  },
  watch: {
    paramter: {
      remark: function (newVal, oldVal) {
        this.getR()
      },
      deep: true
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../../../style/page/content';
</style>
