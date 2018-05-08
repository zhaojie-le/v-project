<template>
  <div class="content-item">
    <p class="title-head" @click="getP">请求参数</p>
    <!-- <paramter
      style="padding: 0 20px"
      :is-generic="1"
      v-model="requestParameterList"
      :list="requestParameterList"
      v-if="requestParameterList"
      >
    </paramter> -->
    <arguments :list="requestParameterList" v-if="requestParameterList"></arguments>
  </div>
</template>
<script>
import Paramter from '../../paramter/index'
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
    getP () {
      console.log('par', this.requestParameterList)
    }
  },
  components: {
    Paramter,
    Arguments
  },
  watch: {
    requestParameterList: {
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
