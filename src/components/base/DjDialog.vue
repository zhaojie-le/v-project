<template>
  <transition name='dialog'>
    <div class="dialog" v-show='visible'>
      <div class="dialog-bg" :style="wrapStyle"></div>
      <div class="dialog-content" :style="wid">
        <slot name='dialogHead'>
            <div class="dialog-head" v-if='headText'>{{headText}}</div>
          </slot> 
        <slot name='dialogBody'>
          <div class="dialog-body" :style="bodyStyle">                
            {{text}}
          </div>
        </slot>
        <slot name='dialogFoot'>
          <div class="dialog-foot">
            <div :class="['btn', index < btns.length - 1 ? 'left-border' : '']" v-for='(item, index) in btns' :key="index" @click='exec(index)'>
            {{item.text}}
            </div> 
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'dialog',
    props: {
      _style: Object,
      text: String,
      headText: String,
      show: {
        type: Boolean,
        default: false
      },
      width: '',
      btns: {
        type: Array,
        default: () => [
          {
            text: '取消',
            eventName: 'cancel'
          },
          {
            text: '确认',
            eventName: 'confirm'
          }
        ]
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visible: this.value
      }
    },
    watch: {
      value (val) {
        this.visible = val
      }
    },
    computed: {
      wrapStyle () {
        const style = this._style
        if (style) {
          if (style.background) {
            return 'background: ' + style.background
          }
          return ''
        }
      },
      bodyStyle () {
        if (this.headText) {
          return 'padding-top:15px'
        } else {
          return 'padding-top:20px'
        }
      },
      wid () {
        const width = this.width
        if (typeof width === 'number') {
          return 'width: ' + width + 'px'
        } else if (typeof width === 'string') {
          return 'width: ' + width
        }
        return ''
      }
    },
    methods: {
      exec (index) {
        this.visible = !this.visible
        this.$emit('input', false)
        this.$emit(this.btns[index].eventName, this.btns[index].arg)
      }
    }
  }

</script>

<style lang="scss" scoped>
  $bg : rgba(0,0,0,0.5);
  $fontColor: #292d33;
  $borderColor: #e8ebf0;
  $btnColor: #e6454a;
  $btnActiveColor: #f5f7fa;

  $zIndex : 100;
  $borderRadius: 2px;
  $titFontSize: 17px;
  $bodyFontSize: 13px;
  $btnFontSize: 16px;
  $btnHeight: 44px;
  $headMargin: 15px;
  $lineHeight: 17px;

  @mixin border{
    position:relative;
    &:after{
      content:'';
      position:absolute;
      background: $borderColor;
      transform: scale(0.5) translate(-50%, -50%);
    }
  }
  @mixin border-bottom{
    @include border;
    &:after{
      width:200%;
      height:1px;
      bottom:0;
      left:0;
    }
  }
  @mixin border-top{
    @include border;
    &:after{
      width:200%;
      height:1px;
      top:0;
      left:0;
    }
  }
  @mixin border-left{
    @include border;
    &:after{
      width:1px;
      height:200%;
      top: -1px;
      right:0;
    }
  }
  @-webkit-keyframes bounce-in {
    0% {
      -webkit-transform: translate(-50%,-50%) scale(0.7,0.7);
    }
    100% {
      -webkit-transform: translate(-50%,-50%) scale(1,1);
    }
  }
  @keyframes bounce-in {
    0% {
      transform: translate(-50%,-50%) scale(0.7,0.7);
    }
    100% {
      transform: translate(-50%,-50%) scale(1,1);
    }
  }
  .dialog-enter-active {
    -webkit-transition: all .15s;
    transition: all .15s;
    .dialog-bg{
      -webkit-transition: opacity .15s linear;
      transition: opacity .15s linear;
    }
    .dialog-content{
      -webkit-animation: bounce-in .15s ease-in-out;
      animation: bounce-in .15s ease-in-out;
    }
  }
  .dialog-leave-active{
    -webkit-transition: all .1s;
    transition: all .1s;
    .dialog-bg{
      -webkit-transition: opacity .1s linear;
      transition: opacity .1s linear;
    }
    .dialog-content{
      -webkit-animation: bounce-in .1s reverse .1s;
      animation: bounce-in .1s reverse .1s;
    }
  }
  .dialog-enter {
    .dialog-bg{
      opacity: 0.2;
    }
    .dialog-content{
      -webkit-transform: scale(0.7,0.7) translate(-50% -50%);
      transform: scale(0.7,0.7) translate(-50% -50%);
    }
  }
  .dialog-leave{
    .dialog-bg{
      opacity: 0.5;
    }
    .dialog-content{
      -webkit-transform: scale(1,1) translate(-50% -50%);
      transform: scale(1,1) translate(-50% -50%);
    }
  }
  .dialog{
    position: fixed;
    top:0;
    left:0;
    z-index: $zIndex;
    width: 100%;
    height: 100%;
  }
  .dialog-bg{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: $bg;
  }
  .dialog-content{
    position: absolute;
    top: 50%;
    left: 50%;
    // width:72%;
    width: 370px;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: $borderRadius;
    font-size: $bodyFontSize;
    text-align: center;
    .dialog-head{
      font-size: $titFontSize;
      margin-top: 20px;
      line-height: 17px;
    }
    .dialog-body{
      padding: 0 15px 20px 15px;
      color: $fontColor;
      @include border-bottom;
      line-height: $lineHeight;
      font-size: 16px;
    }
    .dialog-foot{
      height: $btnHeight;
      line-height: $btnHeight;
      font-size: $btnFontSize;
      display: flex;
      .btn{
        color: $btnColor;
        flex:1;
        &:active{
          background: $btnActiveColor;
        }
        &:hover{
          cursor: pointer;
        }
      }
      .left-border{
        @include border-left;
      }
      @include border-top;
    }
  }
</style>
