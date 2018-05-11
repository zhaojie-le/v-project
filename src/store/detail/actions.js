
import API from '../../service/API'

export default {
  // 接口编辑时，本地保存的body
  saveRequestEdit ({commit}, val) {
    commit('saveRequestEdit', val)
  },
  // 获取全部接口数据
  getRequestMes ({commit}, val) {
    commit('getRequestMes', val)
  },
  // 重置对象数据
  resetObjectP ({commit}, val) {
    commit('resetObjectP', val)
  },
  // 获取字段类型
  async getDataType ({ dispatch, commit }, { parame, callback }) {
    let url = API.DATATYPE
    let method = 'GET'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      commit('getDataType', data)
      callback && callback(data)
    }
  },
  // 获取接口数据
  async getRequest ({ dispatch, commit }, { parame, callback }) {
    let url = API.REQUEST
    let method = 'GET'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      commit('getRequestMes', data)
      callback && callback(data)
    }
  },
  // 删除接口
  async deleteRequest ({ dispatch, commit }, { parame, callback }) {
    let url = API.DELETEREQUEST
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  },
  // 接口编辑修改提交
  async editRequest ({ dispatch, commit }, { parame, callback }) {
    let url = API.SUBMITREQUEST
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  },
  // 请求对象详情数据
  async objectDetail ({ dispatch, commit }, { parame, callback }) {
    let url = API.OBJECTDETAIL
    let method = 'GET'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      commit('changeObjectDetail', data)
      callback && callback(data)
    }
  },
  // 对象数据编辑
  async editObjectDetail ({ dispatch, commit }, { parame, callback }) {
    let url = API.EDITOBJECT
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  },
  // 删除对象数据
  async deleteObject ({ dispatch, commit }, { parame, callback }) {
    let url = API.DELETEOBJECT
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  }
}
