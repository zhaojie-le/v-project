export default {
  // 接口的示例数据
  newRequestData: {
    requestMes: {
      requestName: '示例接口名称',
      requestType: 1,
      requestWay: 1,
      callback: '',
      requestUrl: '/request/url',                      // 接口链接
      mockRequestUrl: '',                              // 接口mock链接
      serverCluster: 'dianshangwuxian-yewuxian-xiangmuming'
    },
    requestParameterList: [                            // 请求参数数组
      {
        identifier: 'id',                              // 变量名
        value: '123',                                  // 模拟数据
        remark: '请求id',                               // 备注
        dataType: 1
      }
    ],
    responParameter: '{"code":0,"data":{}}',           // 返回json格式
    responMockJson: [                                  // mock格式
      {
        responMes: '{"code":1,"data":{}}',             // mock数据
        selected: 1                                    // 是否选中作为mock数据
      }
    ]
  },
  // 新建接口时重置的接口数据
  resetRequestData: {
    requestMes: {
      requestName: '',
      requestType: 1,
      requestWay: 1,
      callback: '',
      requestUrl: '/',            // 接口链接
      serverCluster: ''
    },
    requestParameterList: [       // 请求参数数组
      {
        identifier: '',           // 变量名
        value: '',                // 模拟数据
        remark: '',               // 备注
        dataType: 1
      }
    ],
    responParameter: '',          // 返回json格式
    frameworkResponParameter: '', // mock平台返回的rd json格式
    responMockJson: [             // mock格式
      {
        responMes: '',            // mock数据
        selected: 0               // 是否选中作为mock数据
      }
    ]
  },

  // 请求参数类型对应数组
  dataType: [
    {
      type: 'string',
      number: 1
    },
    {
      type: 'number',
      number: 2
    },
    {
      type: 'boolean',
      number: 3
    },
    {
      type: 'array<string>',
      number: 4
    },
    {
      type: 'array<number>',
      number: 5
    },
    {
      type: 'object',
      number: 6
    },
    {
      type: 'array<object>',
      number: 7
    }
  ],
  // 新建对象详情
  newObject: {
    objectName: '',
    objectParameterList: [      // 请求参数数组
      {
        identifier: '',        // 变量名
        value: '',               // 模拟数据
        remark: '',         // 备注
        dataType: ''
      }
    ]
  }
}
