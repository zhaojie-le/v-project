<template>
  <div class="content-item">
    <p class="title-head">返回参数</p>
    <arguments
      :edit="edit"
      :entity="true"
      :list="responseParameterList"
      v-if="responseParameterList"
      v-model="responseParameterList"
    ></arguments>
  </div>
</template>
<script>
import Arguments from '../../paramter/arguments'
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
    this.responseParameterList = this.rlist
  },
  methods: {
  },
  components: {
    Arguments
  },
  watch: {
    responseParameterList: {
      handler: function (newVal, oldVal) {
        this.$emit('input', this.responseParameterList)
      },
      deep: true
    }
  }
}
</script>
<style scoped lang='scss'>
@import '../../../style/page/content';
</style>
