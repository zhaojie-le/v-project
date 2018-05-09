<template>
  <div class="content-item">
    <p class="title-head">返回参数</p>
    <div>返回参数</div>
  </div>
</template>
<script>
// import Paramter from '../../paramter/index'
export default {
  props: {
    rlist: {
      type: Array,
      default: null
    },
    edit: {
      type: Boolean
    }
  },
  data () {
    return {
      responseParameterList: null
    }
  },
  created () {
    this.responseParameterList = this.list
  },
  methods: {
    getP () {
      console.log('res', this.responseParameterList)
    }
  },
  components: {
    // Paramter
  },
  watch: {
    responseParameterList: {
      handler: function (newVal, oldVal) {
        this.getP()
      },
      deep: true
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../../../style/page/content';
</style>
