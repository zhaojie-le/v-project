/**
 * 数据缓存cache文件
 */

/**
 * cache策略
 *
 * 缓存key相关
 * 1. 自定义key
 * 2. 通过url相关来判断是否相同key (需要和http请求模块放一起写)
 *    1）非严格模式，通过对比url来判断
 *    2）严格模式，通过对比url、请求方式、参数来判断是否为相同的key
 *
 * 缓存数据存储方式方式，强cache还是弱cache
 *    1）localstorage、indexDB
 *    2) sessionstorage、JS对象
 * 2. 是否需要设置缓存数据过期时间
 *    1) 需要设置缓存时间
 *    2) 不需要设置缓存时间 默认为-1，不检测
 *
 * 是否要缓存数据
 *
 * 是否从缓存中取数据
 *
 */

import { lstorage, sstorage } from './storage'
import util from './utils.js'

// 全局配置项
const conf = {
  // 可用的缓存过期时间示例
  // expires: 60 * 60 * 1000,       // 缓存过期时间1小时
  // expires: 60 * 1000,            // 缓存过期时间1分钟
  expires: -1,                      // 缓存时间设置为 -1，代表不检测缓存时间
  type: 1,                          // 1: 强缓存类型， 2: 弱缓存类型
}

// 缓存数据格式
// {
//   expires: 1504003903042 || -1,   // 设置过期时间
//   data: val                       // 源数据
// }

/**
 * 缓存构造函数
 */
function Cache (options = {}) {
  // 设置对象属性
  this.options = Object.assign(conf, options)
}

/**
 * 新创建cache对象
 */
Cache.create = function (options = {}) {
  return new Cache(options)
}

/**
 * 缓存数据
 * key可以是对象字面量，也可以是字符串
 * val 需要缓存的值
 * options 配置项
 */
Cache.prototype.set = function (key, val, options = {}) {
  // 更新配置项
  options = Object.assign(this.options, options)

  // 获取cache MD5 key
  key = util.getKey(key)

  // 判断用户是否需要设置缓存时间
  // 设置缓存时间，则将过期时间持久化，否则持久化-1
  if (options.expires !== -1) {
    options.expires = new Date().getTime() + options.expires
  }

  // 构造存储数据结构
  val = {
    expires: options.expires,             // 设置过期时间
    data: val                             // 源数据
  }

  // 判断存储类型，强缓存(localStorage) || 弱缓存(sessionStorage)存储
  options.type === 1 ? lstorage.set(key, val) : sstorage.set(key, val)
}

/**
 * 获取缓存信息
 */
Cache.prototype.get = function (key, options = {}) {
  // 更新配置项
  options = Object.assign(this.options, options)

  // 获取cache MD5 key
  key = util.getKey(key)

  // 判断数据是否为强缓存类型
  let val = options.type === 1 ? lstorage.get(key) : sstorage.get(key)

  // 判断存在缓存值，并且未设置缓存时间，(默认缓存值为 -1)，返回源数据
  if (val && options.expires === -1) return val.data

  // 判断存在设置缓存值，(缓存值不为 -1)，缓存时间过期则返回false，不过期则返回源数据
  if (val && options.expires !== -1 && val.expires > new Date().getTime()) return val.data

  // 数据源不存在 || 非设置缓存 || 缓存过期，返回 undefined
  return undefined
}

/**
 * 删除缓存数据
 */
Cache.prototype.remove = function (key, options = {}) {
  // 更新配置项
  options = Object.assign(this.options, options)

  // 获取cache MD5 key
  key = util.getKey(key)

  // 判断存储类型，移除强缓存(localStorage) || 弱缓存(sessionStorage)存储
  options.type === 1 ? lstorage.remove(key) : sstorage.remove(key)
}

/**
 * 更新缓存配置文件
 */
Cache.prototype.config = function (options = {}) {
  // 更新配置项
  this.options = Object.assign(this.options, options)
}

// 实例化Cache对象
let cache = new Cache()

export {
  cache,
  Cache
}
