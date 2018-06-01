# Quick guide
用户快速指引

* [创建mock文档](#创建mock文档)
  * [登录](#登录)
  * [创建项目](#创建项目)
  * [创建接口](#创建接口)
* [接口编辑](#接口编辑)
  * [接口删除](#接口删除)
  * [数据编辑](#数据编辑)
    * [接口相关信息](#接口信息编辑)
    * [接口请求参数](#接口请求参数)
    * [接口响应数据](#接口响应数据)
    * [接口mock数据](#接口mock数据)
* [项目查看](#创建mock文档)
* [接口mock功能](#接口mock功能)
  

## 创建mock文档

### 登录
MOCK平台为到家内部应用平台，使用中需要登录公司内网，接入inpass系统使用个人inpass账号密码登录

### 创建项目
登录mock平台后，进入`项目列表页`，点击右上角`新建项目`按钮，进入`新建项目`页面，选择项目所在的业务线及所属子业务线，输入项目名称，点击`提交`按钮后，进入新建项目的`项目详情页`

### 创建接口
* 只有项目创建者可以新建接口，删除接口，编辑接口数据的操作
* 新建项目进入`项目详情页`后，页面右侧接口详情处展示的是示例数据
* 点击左侧`新建接口`按钮，弹层中输入接口名称，确认后，右侧接口详情处默认展示当前新建的接口数据，均为空，待编辑状态


#### 接口删除
进入项目详情页时，若已有接口数据，默认展示第一个接口数据，左侧接口列表点击到当前接口时，接口名称右侧有删除的图标，点击该图标，删除相应的接口
![接口操作](https://static.daojia.com/assets/other/mock-platform/makdown-imgs/jiekou.png)

### 数据编辑
#### 接口相关信息
* 接口的请求方式：`get` `post`
* 接口的请求类型：`ajax` `jsonp`
* 接口的回调函数：只有请求类型选择`jsonp`的时候填写
* 接口的请求路径：以`／`开头，只允许字母，／输入
* 接口的所属集群：由RD提供接口所在的集群名
* 接口的mock地址：接口的一些参数填写完成后，提供的一个在线模拟接口连接
* 从RD获取真实数据后不可再编辑

#### 接口请求参数
* 接口请求参数列表，用来记录参数的名称，类型，及相关备注字段，该请求参数列表可以为空
* 从RD获取真实数据后不可再编辑

#### 接口响应数据
* 定义的接口返回的json格式及模拟数据，填写时必须按照正确的json格式输入，否则保存不成功，该接口格式在没有选择mock数据时，默认为mock接口返回的数据
* 从RD获取真实数据后不可再编辑

#### 接口mock数据
* 接口的mock数据是接口响应数据的一种扩展，针对一种响应格式，可以定义多种不同的数据，选中的当前数据为模拟mock接口返回的响应数据，根据选择不同的数据来模拟不同场景的数据
* 若定义的mock数据，没有默认选中状态，则mock接口返回的是默认的响应数据
* 定义的mock数据在编辑状态下，提供可编辑，可删除功能
* 创建者一直可编辑
#### 如下图所示
![mcok](https://static.daojia.com/assets/other/mock-platform/makdown-imgs/mock.png)

## 项目查看
列表页中，默认展示当前所有的项目列表
项目筛选项中，提供一级业务线筛选，二级业务线筛选
#### 如下图所示 
![mcok](https://static.daojia.com/assets/other/mock-platform/makdown-imgs/list.png)

## 接口mock功能
当接口信息填写了路径，所属集群，响应json格式后，提供模拟链接返回定义的json格式或选中状态的mock数据，后者优先

