
let test = {
  name: 'test',
  list: [{name: 'a',id: 1}],
  cont: {
   all: 'all',
   list: [{id:11, city: 'beijing'}]
  }
}
let json = {
  name: 'test',
  list: [{name: 'a',id: 1}],
  cont: {
   kk: 'abc',
   all: 123,
   list: [{id:'', city: 'beijing'},{id:'', city: 'beijing'}]
  }
}

let ret = []
function jsonDiff (test, stand) {
  for(let k in stand) {
    let type = Object.prototype.toString.call(stand[k])
    let testK = test[k]
    if (testK) {
      let testType = Object.prototype.toString.call(testK)
      if (type !== testType) {
        let e = k + '类型错误'
        ret.push(e)
      }
      if (type === '[object Array]') {
        if (stand[k] && stand[k].length !== 0) {
          let itemS = stand[k][0]
          if (testK && testK.length !==0) {
            let itemT = testK[0]
            jsonDiff (itemT, itemS)
          } else {
            let e = k + '字段错误'
            ret.push(e)
          }
        }

      }
      if(type === '[object Object]') {
        if(stand[k]) {
          if (testK) {
            jsonDiff (testK, stand[k])
          } else {
            let e = k + '字段错误'
            ret.push(e)
          }
        }
      }

    } else {
      let e = k + '字段缺失'
      ret.push(e)
    }
  }
  return ret
}
export {
  jsonDiff
}
