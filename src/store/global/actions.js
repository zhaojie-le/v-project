/**
 * 全局actions文件
 */
import axios from 'axios'
// import qs from 'qs'
import { cache } from '@/utils/cache.js'
import util from '@/utils/utils'

// 正在请求数组变量，防止重复提交请求
let fetchingArr = []

export default {
  /**
   * 异步请求数据方法封装
   * @param {Object} parame 请求参数
   * @param {String} url 请求URL地址
   * @param {String} method 请求方式，默认POST
   * @param {Boolean} isCache 是否需要缓存，默认不缓存
   *  缓存key：根据url、参数、请求方式作为key，相同url，不同参数视为不同key
   * @param {Boolean} isCodeAutoHandle 是否自动处理接口返回数据code
   *  是否自动处理，code非0弹出网络异常。默认不自动处理
   * @return {Object} 返回接口数据
   */
  async fetchData ({ dispatch, commit }, {
    parame,
    url,
    // method = 'POST',
    method = 'GET',
    isCache = false,
    isCodeAutoHandle = false
  }) {
    // 根据请求参数、url、请求方式，获取 MD5 key
    let fetchKey = util.getKey({ parame, url, method })
    // 检测当前url是否正在提交，若存在停止执行，防止重复提交
    if (fetchingArr.indexOf(fetchKey) !== -1) return
    // 添加url至请求队列
    fetchingArr.push(fetchKey)
    try {
      // 异步请求
      let data, res
      if (method === 'GET') {
        res = await axios({ url, method, params: parame })
      } else {
        // res = await axios({ url, method, data: qs.stringify(parame) })
        res = await axios({ url, method, data: parame })
      }
      data = res.data

      // 删除url请求
      fetchingArr = fetchingArr.filter(key => key !== fetchKey)

      // 判断是否需要缓存数据
      if (isCache) {
        // 设置缓存时间，不设置缓存时间则默认持久化存储，不检查过期时间
        // expires: 60 * 1000 缓存时间为一分钟
        const expires = 60 * 1000
        cache.set(fetchKey, isCodeAutoHandle ? data.data : data, { expires: expires })
      }

      // 获取数据处理
      // 如果需要自动处理data.code。非0为网络异常＋
      // data.code为0返回data.data数据
      // 如果需要手动处理data.code，返回整个接口数据data
      if (isCodeAutoHandle) {
        if (!parseInt(data.code)) {
          return Promise.resolve(data.data)
        } else {
          throw new Error('data code error')
        }
      } else {
        return Promise.resolve(data)
      }
    } catch (err) {
      // 删除url请求
      fetchingArr = fetchingArr.filter(key => key !== fetchKey)
      alert(err)
      // 弹出网络异常提示框
      // dispatch('setIsShowNetErrDialog')
    }
  }
}
