
import Vue from 'vue'
import Vuex from 'vuex'

// 全局vuex相关文件
import { actions, getters, mutations, state } from './global/index'
// 列表页
import list from './list/index'
// 详情页
import detail from './detail/index'
// 新建
import create from './new/index'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  modules: {
    list,
    detail,
    create
  }
})
