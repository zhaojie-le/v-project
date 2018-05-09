import API from '../../service/API'
export default {
  // 创建新对象
  async newObject ({ dispatch, commit }, { parame, callback }) {
    alert(0)
    let url = API.NEWOBJECT
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      alert(1)
      callback && callback(data)
    }
  },
  // 创建新的集群
  async newCluster ({ dispatch, commit }, { parame, callback }) {
    let url = API.NEWCLUSTER
    let method = 'POST'
    let data = await dispatch('fetchData', { url, method, parame }, { root: true })
    if (data) {
      callback && callback(data)
    }
  }
}
