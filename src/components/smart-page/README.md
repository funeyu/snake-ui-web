## 简介：
先有简单的两个`react`组件`Form` 和 `Table` 和一个基础组件`BaseComponent`

### Form主要功能点

#### 使用方法：

> 总体的功能是通过传入`json`，达到能动态配置`form`项的功能，同时用户不用关注`form`里的数据存储关系等，要做的是声明式指定一些项，便能达到`form`表单的功能；

##### 1. 简单使用：
```javascript
import {Form} from '@didi/SmartPage'

// name为label显示，key为form表单内容的key值
const formItems = [
  {name: '司机专快ID', key: 'driverID', type: Input, defaultValue: 'test8090'},
  {name: '司机手机号', key: 'driverPhone', type: Input},
  {name: '账单类型', key: 'type', type: Input},
  {name: '支付模式', key: 'pay', type: Select, options: [{name: '全部', value: 'all'}, {name: '余额代扣', value: 'reblance'}, {name: '余额代扣-日扣优先', value: 'reblance-first'}, {name: 'CP余额支付', value: 'cp'}, {name: '司机主动支付', value: 'driver'}]]

// columnSize 是为了配置一行显示多少列
<Form columnSize={3} layout='inline' formItems={formItems} />
// 这个时候 如果能拿到Form的instance，通过调用form类的getValue()就能获取form的值：{dirverID: 'test8090, pay: 'all'}
```

##### 2. 校验的场景：
``` javascript
const items = [{name: '退款金额', type: Input, key: 'refund', addonBefore: '￥',
      rules: ['require']
    }
];
```
> 1. `rules`可以为`string`,现在暂时只支持'require';
> 2. 也可以为复杂的函数如下：(如果输入的退款钱数大于1000 就报错提示，注意点：只要是错误了，就返回一个ok属性为`false`， 并且带有`error`)
``` javascript
const items = [
  {name: '退款金额', type: Input, key: 'refund', addonBefore: '￥'},
   rules: [
    function(formData){
      if(formData.refund * 1 > 1000) {
        return {
          ok: false,
          error: `退款金额不能超过${1000}`
        }
      }
      return {
        ok: true
      }
    }
  ]
]
```
3. 大体的实现思路我们一眼就明了，就是在`input`发生变化的时候，会去一次调用`rules`里的方法，并且将`form`的`formData`传递给校验函数
问题是：如果上列中的`1000`也要从外部传递怎么办呢？可以这样做：
给rule函数绑定一个`outer`变量；
``` javascript
const {thisIsVariable} = props
const items = [
  {name: '退款金额', type: Input, key: 'refund', addonBefore: '￥'},
   rules: [
    function(outer, formData){
      if(formData.refund * 1 > outer) {
        return {
          ok: false,
          error: `退款金额不能超过${outer}`
        }
      }
      return {
        ok: true
      }
    }.bind(null, thisIsVariable)
  ]
]
```

##### 3.联动怎么做呢?
``` javascript
const items = [
  {name: '支付模式', key: 'pay', type: Select, defaultValue:'all', options: [{name: '全部', value: 'all'}, {name: '余额代扣', value: 'reblance'}],
   interact: [(form)=> {
    const formData = form.formData
    if(formData.orderType==='collect') {
      return {
        key: 'pay', // 这个key值一定要给
        options: [{name: '余额代扣', value: 'reblance'}],
        defaultValue: 'reblance'
      }
    }
   }, ['orderType']]
  }
]
```
> 这段代码就是示例两个`form`字段之间的交互；配置`interact`属性,格式为：[fn, [inters]], 如上意思就是`pay`项依赖于`orderType`字段变化，`orderType`字段变化了，会引起`pay`下拉框的变化；这种场景很常见，即一个下拉选择与其他下拉下拉选择的联动

> 这里的`interact`函数可以是有返回值的函数（返回值可以直接普通对象，也可以返回`promise`， `promise`的时候，`promise`的`then`要返回如上类型的数据 ）也可以是不带返回值的函数；

> 这里的要是要监听自己的变化，只要将依赖项设置为自己的`key`

#### Form可用的公共方法
1. `getValue()：` 获取`form`包含的数据，如果有校验失败，返回是null
2. `getValueWithNoValidate`: 获取`form`包含的数据，没有校验
3. `Validate`: 手动触发校验
4. `ResetFormdata()`: 重置`form`数据, 重新根据之前的formItems，有`defaultValue`重新收集`defaultValue`

下面几个函数一般在`interact`配置项里使用：

5. `DeleteItems(keys)`: 动态删除`form`里的项，`keys`为：要删除的key数组
6. `DynamicAdd(items, start)`: 动态添加`form`里的项，`items`为配置数组, `start`为要在之前的数组哪个位置添加，不填就是追加到最后一项；
7. `DynamicAddBeforeKey(items, key)`: 动态添加`form`里的`items`项于`key`项之前；
8. `DynamicAddAfterKey(items, key)`: 动态添加`form`里的`items`项于`key`项之后；
9. `ChangeItemByKey(key, item)`: 动态修改指定`key`项的`item`值；
10. `UpdateValueByKey(value, key)`: 修改指定的`key`项的`value`值；
```javascript
const item = [
    {
        name: '类型', key: 'type', type: DatePicker, rules: ['require'], interact: [
            function(form) {
                form.UpdateValueByKey(undefined, 'selc')
            }, 
            ['type']
        ]
    }
]
```

```javascript

const formItems = [{
    name: '省份', type: Select, key: 'province', 
    options: [
      {name: '江苏', value: 'jiangsu'}, 
      {name: '湖北', value: 'hubei'}
    ],
    interact: [(form)=> {
      // 这里可以用form.ChangeItemByKey方法，去改变城市的选项状态
      const province = form.formData.province;
      let cityOpitons
      if (province === 'jiangsu') {
        form.ChangeItemByKey('city', {
          disabled: false,
          options: [
            {
              name: '南京',value: 'nanjing',
            },
            {
              name: '连云港',value: 'lianyungang'
            }
          ]
        })
      }
    }, ['province']]
  },
  {
    name: '城市', type: Select, key: 'city', disabled: true,
    options: []},
  }
]
```

> 上面两个5和6接口是在`interact`配置项使用的
比如一个场景：
有一个含有`name`的`Select`,如果`Select`下拉选中`江苏`就追加新`Select`，并且有默认值`南京`,配置项数组可以写成：
``` javascript
const formItems = [
  {
  name: '省份', type: Select, key: 'province', 
  options: [
    {name: '江苏', value: 'jiangsu'}, 
    {name: '湖北', value: 'hubei'}
  ], 
  interact: [(form)=> {
   const province = form.formData.province
   if(province === '江苏') {
     form.DynamicAdd([
        {name: '城市', type: Select, key: 'province', defaultValue: 'nanjing'
          options: [
            {name: '南京', value: 'nanjing'}, 
            {name: '连云港', value: 'lianyungang'}
          ]
        ])
      }
    } else {
      // do something
    }
   }, ['orderType']]}
]
```
> form的里的联动校验全部内嵌在自身中，外部不去维护状态，只关心获取值
### Table的使用

先来了个例子
``` javascript
const columns = [
  {
    title: '账单ID',
    dataIndex: 'orderId',
  },
  {
    title: '账单类型',
    dataIndex: 'orderType'
  }
]

<Table columns={columns} queryParams={xxx} pageNumField='page.num'pageSizeField='page.size'
  request = {
    (params)=> {
    return fetch('http://localhost:8099/api/testTable', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    }).then(data=> data.json()).then(data=> {
      return {
        dataSource: data.data,
        total: data.total
      }
    });
  }
/>
```
> table组件只要传一个columns,和一个`request`,这个`request`是一个返回`promise`的函数，函数参数为`params`，`promise`的`resolve`值有`Table`组件必须的`dataSource`和`total`(总条数)； 如果有默认的请求条件则要配置`queryParams`；

> 参数`pageNumField='page.num'` `pageSizeField='page.size'` 这个是为了配置请求的分页的`param`的属性值，如上传给请求的参数就为`{page: {num: xxx, size: xxx}}`;如果要设置平级的，可以为：`pageNumField='num'` `pageSizeField='size'`,这个时候请求参数体就为`{num: xxx, size: xxx}`;

> note: 这里为什么没有用更傻瓜是的直接传入`url`呢，因为如果传入`url`由`table`组件去发请求的话，那么`api`层的一些公用的逻辑就不好实现(如在请求的时候，没有数据权限要跳转其他页面等);

#### `Table`的接口：

1. `Search`：外部传入参数`params`（现在暂定不含有页码信息）进行查找，不用管里面的页码控制啥的； 
使用方式
``` javascript
const tableInstance = 获取到Table的实例
tableInstance.Search(params);
```
2. `Frozen`：调用该函数，可以记录当前`table`的状态，包括当前页数，传入的参数，等下次路由切换到该table的时候，解冻到当前状态, 该解冻操作只有一次；（注意要使用该功能，一定要设置ReactID属性）

