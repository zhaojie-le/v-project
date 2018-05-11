<template>
  <div class="content-item">
    <p class="title-head">请求参数</p>
    <arguments :list="requestParameterList" v-if="requestParameterList" :edit="edit" v-model="requestParameterList"></arguments>
  </div>
</template>
<script>
// import Paramter from '../../paramter/index'
import Arguments from '../../paramter/arguments'
export default {
  props: {
    plist: {
      type: Array,
      default: null
    },
    edit: {
      type: Boolean
    }
  },
  data () {
    return {
      requestParameterList: null
    }
  },
  created () {
    this.requestParameterList = this.plist
  },
  methods: {
  },
  components: {
    // Paramter,
    Arguments
  },
  watch: {
    requestParameterList: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.requestParameterList)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../../../style/page/content';
</style>
