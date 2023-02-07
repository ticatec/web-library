# 公共数据字典管理

在前台的开发中，我们经常需要中使用数据字典用于选择，key-value转换工作。通过这个管理类库可以简单的实现。里面总共包括了三个组件

## 数据字典的类型

### 单层字典 Dictionary
单层字典建立一组key-value映射组。  
* 构造函数：
new Dictionary(loader, keyName, getText, missingText);    

其中loader是一个加载数据的函数，返回一个数组，keyName是字典的中key关键字的字段名，getText可以简单的是一个表示值的字段名，
也可以是一个函数，用于对应项目的显示值，missingText是没有对应数据项的时候返回的表达值。
使用方法如下：
```
  import Dictionary from 'ticatec-ts-dictionary';
  
  const deviceTypeLoader = async()=>await deviceService.getList();
  /**
   * 构造一个设备类型的数据字典，其中的关键字的字段为code，表达值的字段为text
   */
  const dicDeviceType = new Dictionary(deviceTypeLoader, 'code', 'text', '不存在的设备类型');
  
  
  const faultTypeLoader = async()=>await faultService.getList();
  const getFaultDesc = item => `${code}-${name}`;
  /**
   * 构造一个故障类型的数据字典，其中的关键字的字段为id，表达值的根据函数计算，返回code和name组合的字符串
   */
  const  dicFaultTypeDic = new Dictionary(deviceTypeLoader, 'id', getFaultDesc, '错误的故障类型编码');
  
```
数据字典类也支持加载本地静态数据，比如json格式的数据，示例代码如下：
JSON数据：gender.json
```
  [
    {"code":"M", "text":"男"}, 
    {"code":"F", "text":"女"}, 
    {"code":"N", "text":"未知"}
  ]
```
ts示例代码:
```
    import genders from './data/gender.json';
    
    const dicGender = new Dictionary(()=>genders, 'code', 'text', '错误的性别编码');
```

* 属性
1. **list** 数据字典中数据项列表
2. **initialized** 数据字典是否初始化完毕

* 方法
1. **reload()** - 异步方法，加载数据
2. **get(key)** - 根据key值返回对应的数据项
3. **getValue(key)** - 根据key值返回对应的表达值，如果不存在，返回预定义的missingText

### 层次型数据字典 TreeDictionary
层次型数据字典是一个树状的多层数据字典，用于记录多级机构，比如省-市-区县的字典类。层次型数据字典集成自普通的数据字典

**特殊要求：** loader返回的数据项中包含子数据项的，属性名称必须是**children**
* 构造函数：
  new TreeDictionary(loader, keyName, getText, missingText, isLeaf);
前面的四个参数同普通的数据字典构造参数，最后一个是一个函数，判断数据项是否是一个叶节点。示例代码：  
```
const isLeaf = item => item.children == null;
```
* 属性
1. **leafs** 所有的叶节点

* 方法
1. **getChildren(key)** 获取指定节点的所有子数据项

通常来说，程序员没有必要自己初始化数据字典，可以通过数字字典管理器来管理所有的数据字典

## 数据字典管理器单一实例 dicManager

这是一个数据字典管理类的实例。项目中需要的所有数据字典都可以让这个来管理。使用方法如下：

```
  import dicManager from 'ticatec-ts-dictonary';
```

dicManager包括以下方法：

* 注册一个普通数据字典，register
* 获取一个数据字典，get
* 初始化加载指定的数据字典 initialize
* 初始化加载指定的数据字典 refresh

### register

```
    /**
     * 注册一个普通的数据字典
     * @param key 数据字典的名称
     * @param dic 数据字典
     */
    dicManager.register('gender', dicGender);
```

### get

返回对应的数据字典
```
    let dic = await dicManager.get('country');
```

### initialize
```
    await dicManager.initialize(['country', 'gender', 'org', 'dept']); 
```
