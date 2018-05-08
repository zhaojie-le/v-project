import md5 from 'blueimp-md5'

/**
 * 获取浏览器url参数
 */
var urlParam = (function (window) {
  //匿名方法只对url执行一次解析
  var args;
  //解析search
  var result = window.location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
  if (result != null) {
    //将结果转换为 object
    args = {};
    for (var i = 0; i < result.length; i++) {
      var ele = result[i];
      var inx = ele.indexOf("=");
      args[ele.substring(1, inx)] = ele.substring(inx + 1);
    }
  }
  //返回function可多次调用
  return function (key) {
    if (key && args) { //如果传key值 则返回对应的value
      return args[key];
    }
    //默认返回全部
    return args;
  }
})(window)

/**
 * 添加url参数
 */
function addUrlPara (destiny, par, par_value)
{
    var pattern = par+'=([^&]*)';
    var replaceText = par+'='+par_value;
    if (destiny.match(pattern))
    {
        var tmp = '/\\'+par+'=[^&]*/';
        tmp = destiny.replace(eval(tmp), replaceText);
        return (tmp);
    }
    else
    {
        if (destiny.match('[\?]'))
        {
            return destiny+'&'+ replaceText;
        }
        else
        {
            return destiny+'?'+replaceText;
        }
    }
    return destiny+'\n'+par+'\n'+par_value;
}

/**
 * 判断空对象
 */
function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

/**
 * 拼接URL参数
 * @param t
 * @returns {string}
 */
function urlParameter (t) {
  t  = t || {}
  var e = [];
  for (var i in t)
    e.push(i + "=" + t[i]);
  return e.join("&")
}

/**
 * 判断fn是否是Function
 * @param fn Function
 * @returns {boolean}
 */
function isFunction (fn) {
  return '[object Function]' === Object.prototype.toString.call(fn);
}

/**
 * 判断是否是Object
 * @param obj
 * @returns {boolean}
 */
function isPlainObject (obj) {
  return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
}

/**
 * 获取当前页面hash路由
 * @param {string} url 页面链接
 */
function getHashRouter(url) {
  if (!url) url = window.location.href
  let arr, router

  arr = url.split('#')
  if (arr[1]) {
    router = arr[1].split('?')[0]
    router = router.substring(1, router.length)
  }
  return router
}

/**
 * 判断数据是否为数组类型
 * @param {Array} arr
 */
function isArray (arr) {
  return Object.prototype.toString.apply(arr) === '[object Array]'
}

/**
 * 判断数据是否为对象
 * @param {Object} obj
 */
function isObject (obj) {
  return Object.prototype.toString.apply(obj) === '[object Object]'
}

/**
 * 对象或数组拼接成字符串
 */
function objectToString (param) {
  if (!isObject(param) && !isArray(param)) return param.toString()
  // 数组操作
  if (isArray(param)) {
    return param.join('')
  }
  // 对象操作
  if (isObject(param)) {
    let str = ''
    Object.keys(param).forEach(key => {
      str += key + JSON.stringify(param[key])
    })
    return str
  }
}

/**
 * 获取md5加密字符串
 */
function getKey (param) {
  return md5(objectToString(param))
}

/**
 * 异步加载js
 * Options:
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object} optional options
 * @param {Function} optional callback
 * @return {Promise}
 */
function loadJs ({url, options = {}}) {
  return new Promise ((resolve, reject) => {
    if (!url) {
      reject(new Error('NO URL'))
    }

    let timeout = options.timeout || 60000
    let target = document.getElementsByTagName('script')[0] || document.head
    let timer, script

    // 超时自动取消
    if (timeout) {
      timer = setTimeout(() => {
        cleanup()
        reject(new Error('Timeout'))
      }, timeout)
    }

    // 清理函数
    function cleanup () {
      if (script.parentNode) script.parentNode.removeChild(script)
      if (timer) clearTimeout(timer)
    }

    // 创建js文件
    script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    target.parentNode.insertBefore(script, target)

    // IE的script 元素支持onreadystatechange事件，不支持onload事件
    // FF的script 元素不支持onreadystatechange事件，只支持onload事件
    script.onload = script.onreadystatechange = function () {
      if (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete') {
        resolve()
        if (timer) clearTimeout(timer)
      }
    }
  })
}

export default {
  // 拼接URL参数
  urlParameter,
  // 获取浏览器url参数
  urlParam,
  // 添加url参数
  addUrlPara,
  // 判断fn是否是Function
  isFunction,
  // 判断是否为Object
  isPlainObject,
  // 判断是否为空对象
  isEmptyObject,
  // 获取当前页面hash路由
  getHashRouter,
  // 获取md5key
  getKey,
  // 异步加载js
  loadJs
}
