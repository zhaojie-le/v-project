
import API from '../../service/API'

export default {
  // 重置搜索列表请求参数
  changeListParam ({ commit }, val) {
    commit('changeListParam', val)
  },
  changePage ({ commit }, val) {
    commit('changePage', val)
  },
  // 获取初始信息
  async getInfo ({ dispatch, commit }, { parame, callback }) {
    let url = API.INFO
    let data = await dispatch('fetchData', {url, parame}, { root: true })
    if (data) {
      commit('getInfo', data)
      callback && callback(data)
    }
  },
  // 获取接口列表
  async getRequestList ({ dispatch, commit }, { parame, callback }) {
    let url = API.REQUESTLIST
    let data = await dispatch('fetchData', {url, parame}, { root: true })
    if (data) {
      commit('getRequestList', data)
      callback && callback(data)
    }
  },
  // 创建新项目
  async submitProduct ({ dispatch, commit }, { parame, callback }) {
    let url = API.SUMBITPROJECT
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  },
  // 请求对象列表接口
  async objectList ({ dispatch, commit }, { parame, callback }) {
    let url = API.OBJECTLIST
    let method = 'GET'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      commit('objectListInfo', data)
      callback && callback(data)
    }
  },
  // 请求集群列表
  async getClusterList ({ dispatch, commit }, { parame, callback }) {
    let url = API.CLUSTERLIST
    let method = 'GET'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      commit('clusterList', data)
      callback && callback(data)
    }
  }
}
