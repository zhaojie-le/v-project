/**
 * 缓存存储相关操作
 */

import {
  localStorageSupported,
  sessionStorageSupported } from './support.js'
import cookie from './cookie.js'

let keyMap = {}
let skeyMap = {}
let localStorage = window.localStorage
let sessionStorage = window.sessionStorage

/**
 * 判断是否是Object
 * @param obj
 * @returns {boolean}
 */
let isPlainObject = function (obj) {
  return Object.prototype.toString.apply(obj) === '[object Object]' ||
    Object.prototype.toString.apply(obj) === '[object Array]'
}

/**
 * localStorage
 */
var lstorage = {
  /**
   * 存储数据
   * @param key
   * @param value
   */
  set: function(key, value) {
    var val = isPlainObject(value) ? JSON.stringify(value) : value
    keyMap[key] = val
    localStorageSupported ? localStorage.setItem(key, val) : cookie.set(key, val)
  },
  /**
   * 解析数据
   * @param key
   * @returns {*}
   */
  get: function(key) {
    var val = localStorageSupported ? localStorage.getItem(key) : cookie.get(key)
    try {
      return JSON.parse(val)
    } catch(e) {
      return val
    }
  },
  /**
   * 移除数据
   * @param key
   */
  remove: function(key) {
    delete keyMap[key]
    localStorageSupported ? localStorage.removeItem(key) : cookie.remove(key)
  }
}

/**
 * 移除数据
 */
if (!localStorageSupported) {
  window.addEventListener('onbeforeunload', function(e) {
    for (var key in keyMap) {
      lstorage.remove(key)
    }
  })
}

/**
 * sessionStorage
 */
var sstorage = {
  /**
   * 存储数据
   * @param key
   * @param value
   */
  set: function(key, value) {
    var val = isPlainObject(value) ? JSON.stringify(value) : value
    skeyMap[key] = val
    sessionStorageSupported ? sessionStorage.setItem(key, val) : cookie.set(key, val)
  },
  /**
   * 解析数据
   * @param key
   * @returns {*}
   */
  get: function(key) {
    var val = sessionStorageSupported ? sessionStorage.getItem(key) : cookie.get(key)
    try {
      return JSON.parse(val)
    } catch(e) {
      return val
    }
  },
  /**
   * 移除数据
   * @param key
   */
  remove: function(key) {
    delete skeyMap[key]
    sessionStorageSupported ? sessionStorage.removeItem(key) : cookie.remove(key)
  }
}

/**
 * 移除数据
 */
if (!sessionStorageSupported) {
  window.addEventListener('onbeforeunload', function(e) {
    for (var key in skeyMap) {
      sessionStorage.remove(key)
    }
  })
}

export {
  lstorage,
  sstorage
}
