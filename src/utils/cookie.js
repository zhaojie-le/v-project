
function setFunc (name, value) {
  var exp = new Date()
  exp.setTime(exp.getTime() + 8 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}
var CK = {
  get (name) {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr === document.cookie.match(reg)) {
      var ret = unescape(arr[2])
      if (!ret || ret === undefined || ret === 'undefined' || ret === '{}') {
        ret = null
      }
      return ret
    } else {
      return null
    }
  },
  set (name, value) {
    if (!value || value === undefined || value === 'undefined' || value === '{}') {
      return
    }
    var exp = new Date()
    exp.setTime(exp.getTime() + 8 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  },
  remove (name) {
    // this.set(name, '', 0);
    setFunc(name, '', 0)
  }
}
export default CK
