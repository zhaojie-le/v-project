<template lang="html">
  <div :class="customClass" v-show="visible">
    <div class="dj-toast" :style="width">
      <div class="dj-toast-con" v-if="type === 'normal'">
        <p>{{msg}}</p>
      </div>

      <div class="dj-toast-con" v-if="type === 'suc'">
        <span class="dj-toast-icon dj-toast-icon-ok"></span>
        <p>{{msg}}</p>
      </div>

      <div class="dj-toast-con" v-if="type === 'err'">
        <span class="dj-toast-icon dj-toast-icon-err"></span>
        <p>{{msg}}</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * type: normal, suc, err
 */
export default {
  name: 'toast',
  props: {
    msg: {
      type: String,
      default: 'hello world'
    },
    type: {
      type: String,
      default: 'normal'
    },
    customClass: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: true,
      visible: this.value
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible () {
      if (this.visible) {
        window.setTimeout(() => {
          if (this.visible) {
            this.visible = false
            this.$emit('input', false)
            this.$emit('fterClosed')
          }
        }, 1200)
      }
    }
  },
  computed: {
    width () {
      if (this.msg && this.msg.length > 6) {
        this.twidth = 195
        return 'width: 195px'
      } else {
        return 'width: 130px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.dj-toast {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%,-50%);
  z-index: 1000;
}
@-webkit-keyframes scaleUp {
  0% {
    transform: scale3d(0.6, .6, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes scaleUp {
  0% {
    transform: scale3d(0.6, .6, 1);
    opacity: 0;
  }
  100% {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
}

@-webkit-keyframes scaleShock {
  0% {
    transform: scale3d(0.4, .4, 1);
  }
  60% {
    transform: scale3d(1.07, 1.07, 1);
  }
  80% {
    transform: scale3d(.97, .97, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

@keyframes scaleShock {
  0% {
    transform: scale3d(0.4, .4, 1);
  }
  60% {
    transform: scale3d(1.07, 1.07, 1);
  }
  80% {
    transform: scale3d(.97, .97, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}

.dj-toast-con {
  font-size: 15px;
  line-height: 15px;
  padding: 15px;
  text-align: center;
  background: rgba(0,0,0,.75);
  border-radius: 2px;
  animation: scaleUp .1s;

  p {
    font-size: 15px;
    line-height: 25px;
    white-space: wrap;
    margin-top: 8px;
    margin-bottom: 0;
    &:nth-of-type(1) {
      margin-top: 0;
    }
  }

  .dj-toast-icon {
    width: 23px;
    height: 23px;
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 6px;
    animation: scaleShock .4s;
    text-align: center;
  }

  .dj-toast-icon-ok {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAn1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Kd3m4AAAANHRSTlMAEAn53AcTzlD8SwPvf3LZylsq54z24bqzRxvTwZgvIRe3nmPEvjLQcWpnOKuRdGFUP3d17U7ngQAAAhVJREFUSMeVltmaojAQhRMSCJuAsou7trY6vc2c93+2+UJUJCjYdUfyk9ReIbpQO8lDnzE/XCe2RXrFHK8d3ImTj82nsBFkAJuN7IllmnRij3IGxMGTH0oOHI6t++k2ArLy0dFzQLjddfcAzA19dRUhDbxHl3pBip22s+Tgi2c2Lfi4vTDNEK16HKbpLRBRMiTHf0TJHNwapL+AkTIebD9Ijx0o3uAIBulvSTMZgXcIb4h2maRdaXaMcoguJe1810pBDNE/qaSV89fYDtBnSV8o6rABl+99SR/Vh41ZP72Q9M13CUa99CQG0DAF7D56eUcb55KEmNyl2lKnM0knl4sQEh9NutAqXrQzlUv647oNnwDmLTHfAP/nvmZCSW9uhQLnHn8HgLQxxapq2rulPVhLmQ8AcE7XuwUA/PGa3+G3Tf2Lxg80AoBC3X01VXPklyOZuUeIsQOAdUPLiBZ6mNy01sCUZgNvrY4xQtJJgrNfczkA7Fo0mcHuptgkgxK93Clz6IMEnlaKFlqmbpE/LA9aW1npzUFgLGMZw9X7ZQGEK71cERsqmJVe2t6GT/WlAwJ1Fscn0aXTpgJwg7zclvasUXkz2PQsjs3rLZVGEEa7YVs9Z0fIpr8YB+BaVa4E2JNh85lCrF4eZZUaZd0NDoiT1VL6JABePhvD8WUMUzWGZ/UYNnqGfD485PUnRKGeEEVid4LxH/NkR/uqs14NAAAAAElFTkSuQmCC');
    background-size: 100% 100%;
  }

  .dj-toast-icon-err {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMA+tzPCAZyEowPTxZLyrnm2X9mMAPutVvB8ZtI7ODSUSsqIRz0lZHAXFQ9rloAAAGGSURBVEjHlZbZkoIwEEU7xEDIyL4q7uvc///BwcKaIEEI58kqTjUNpm9DQ3wlw7hgrIhDqXyaRFQlQw8WVuKrvHIjgNXJ8eQJ4Z2OSc2AyF2N240D8NSjHl7KAacZK30H+JoM1gfgbtzgJ8DNzWmE3L2B/9AHFwdORl/I2osX6nHdI+gXMG+9v/b65ggmX7EfgOv+t3A+a6Pls76D7f/Dg2U0rVPGsH634sClOZ1cOKv3D57P6znviooIDc3r1CB6la/AyUYnjoqIQqR2eoqQyGfMt9I7U6EmO51qKJJIbPUEkkooW12hpBhnW/2MmDbwbHUPOwKErS7AFuoLm1n4qPpFzqNQ6r9pngRSH4J5aih9xGZpTU8f4FlShOPjIR7F5iHM8fh9TXaEYTRKtMhhWHbDRy4Og9HeoWUzGO0DXB0cE7oODiOWjGbMWDJDT8iieAgz9JZHqn1gL18HugAHs1g2uv+t3SrTFywWpbmGn3oNPwdr2FzyodWS13hKlt0nRCmVMfV/Jf4ycDaOpHkAAAAASUVORK5CYII=');
    background-size: 100% 100%;
  }
}
</style>
