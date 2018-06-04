// var hoss = 'http://yapi.demo.qunar.com/mock/7178'
var hoss = 'http://mock.djtest.cn'

module.exports = {
  // 页面初始信息
  INFO: hoss + '/cluster/list',
  // 页面字段类型接口
  DATATYPE: hoss + '/dataType/list',
  // 列表页－接口列表
  REQUESTLIST: hoss + '/api/list',
  // 详情页－接口信息数据
  REQUEST: hoss + '/api/get',
  // 详情页－新建接口
  NEWREQUEST: hoss + '/api/add',
  // 详情页－编辑接口提交
  SUBMITREQUEST: hoss + '/api/update',
  // 删除接口
  DELETEREQUEST: hoss + '/api/delete',
  // 对象列表
  OBJECTLIST: hoss + '/entity/list',
  // 新建对象
  NEWOBJECT: hoss + '/entity/add',
  // 对象数据详情
  OBJECTDETAIL: hoss + '/entity/get',
  // 对象编辑接口
  EDITOBJECT: hoss + '/entity/update',
  // 删除对象
  DELETEOBJECT: hoss + '/entity/delete',
  // 新建集群
  NEWCLUSTER: hoss + '/cluster/add',
  // 集群列表
  CLUSTERLIST: hoss + '/cluster/list',

  PATH: hoss
}
