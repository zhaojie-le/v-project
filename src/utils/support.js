/**
 * 功能检测相关函数
 */
let sessionStorage = window.sessionStorage
let localStorage = window.localStorage

let sessionStorageSupportedFn = function () {
  let testKey = 'test'
  try {
    sessionStorage.setItem(testKey, '1')
    sessionStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

let localStorageSupportedFn = function () {
  let testKey = 'test'
  try {
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

let sessionStorageSupported = sessionStorageSupportedFn()
let localStorageSupported = localStorageSupportedFn()

export {
  sessionStorageSupported,
  localStorageSupported
}
