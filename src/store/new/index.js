/**
 * 新建 Modules
 */
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true
}
