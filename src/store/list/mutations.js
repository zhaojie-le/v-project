import { lstorage } from '../../utils/storage'
export default {
  // 获取初始信息
  getInfo (state, val) {
    state.infoData = val.data
  },
  // 改变项目列表值
  getRequestList (state, val) {
    state.requestList = val.data.list
    state.pageData = val.data.pagination
  },
  // 重置列表请求参数
  changeListParam (state, val) {
    state.listParam = val
  },
  changePage (state, val) {
    state.page = val
  },
  objectListInfo (state, val) {
    state.objData = val.data
  },
  // 获取集群列表
  clusterList (state, val) {
    state.clusterList = val.data.clusterList
    lstorage.set('clusterList', state.clusterList)
  }
}

