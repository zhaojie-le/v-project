
export default {
  // 获取字段类型
  getDataType (state, val) {
    state.dataTypeList = val.data
  },
  // 获取接口数据
  getRequestMes (state, val) {
    state.requestMes = val.data
    state.requestEdit = val.data
    state.reqParames = val.data.requestParameterList
    state.reqResponse = val.data.responseParameterList
  },
  // 初始对象列表
  objectListInfo (state, val) {
    state.objectNameList = val.data.objectList
  },
  // 对象详情
  changeObjectDetail (state, val) {
    state.objectData = val.data,
    state.objectP = val.data.propertyList
  },
  // 新建对象数据
  newObject (state, val) {
    state.objectData = val
    state.objectParamterList = val.objectParameterList
  },
  // 重置对象参数数组
  resetObjectP (state, val) {
    state.objectP = val
  }
}

