# 增强工具类

在这个软件包中，包括了一些增强工具类，对Object和Array增加了新的函数，用于扩展强化功能。

## Object

对Object类增加了以下三个方法：

### 深度复制 clone
深度复制将新建一对象，所有的值都和当前的对象完全一样，这个复制是深度复制，是将对象序列化后再反序列化成为一个全新的对象。两个对象直接没有任何连接。 
使用方法：
```javascript
  let obj = {name: 'James', age: 16, hobby: ['swim', 'travel', 'golf'], group: {code: '00', name: 'group a'}};
  let obj1 = obj.clone();
  console.log(obj==obj1, obj.group==obj1.group, obj.hobby==obj1.hobby);
```
### 清理空属性 purge
将对象实例中的null或者空字符串（包括仅仅包括空格的字符串）对应的属性都删除。  
使用方法：
```javascript
  let criteria = {from: '2022-01-01', to: '2022-01-31', status: ' ', name: '', dept: null};
  let criteria1 = criteria.purge();
  console.log(criteria1);
  /*输出的内容会仅仅包括 from 和 to两个属性*/
```

### 合并目标对象 merge
把目标对象中的指定属性合并到当前的对象里面，如果有重名属性，会更新当前对象中的属性。
```javascript
  let obj = {name: 'James', age: 16, hobby: ['swim', 'travel', 'golf'], group: {code: '00', name: 'group a'}};
  let obj1 = {age: 17, gender: 'M', location: 'Norway'}
  obj.merge(obj1, ['gender', "location"]); /*合并指定属性到当前对象*/
  obj.merge(obj1); /*合并所有属性到当前对象*/
```

## Array
对数组对象扩展了三个函数，删除对象，替换对象，合并

### 删除对象 remove
从数组中删除指定的对象，如果删除成功返回true，没有找到对应的对象，返回false  
使用方法：
```javascript
  let obj1 = {id: 12, code: 'c1'};
  let obj2 = {id: 13, code: 'c2'};
  let obj3 = {id: 14, code: 'c3'};
  let obj4 = {id: 15, code: 'c4'};
  let arr = [obj1, obj2, obj3, obj4];
  arr.remove(obj2);
```

### 替换对象 replace
从数组中替换第一个匹配的对象，如果替换成功返回true，没有找到对应的对象，返回false  
使用方法：
```javascript
  let obj1 = {id: 12, code: 'c1'};
  let obj2 = {id: 13, code: 'c2'};
  let obj3 = {id: 14, code: 'c3'};
  let obj4 = {id: 15, code: 'c4'};
  let arr = [obj1, obj2, obj3, obj4];
  arr.replace({id: 13, code: 'cc5'}, (e1, e2)=>e1.id=e2.id);
```

### 合并数组 union
把目标数组合并到当前数组中，如果有重复的元素，则替换  
使用方法：
```javascript
  let obj1 = {id: 12, code: 'c1'};
  let obj2 = {id: 13, code: 'c2'};
  let obj3 = {id: 14, code: 'c3'};
  let obj4 = {id: 15, code: 'c4'};
  let obj5 = {id: 14, code: 'c3'};
  let obj6 = {id: 15, code: 'c4'};
  let arr = [obj1, obj2, obj3, obj4];
  let arr1 = [{id: 13, code: 'cc5'}, obj5, obj6];
  arr.union(arr1, (e1, e2)=>e1.id=e2.id);
```

## 另外还包括两组工具函数包

### stringUtils
字符串工具包，包括判断是否是字符串 **isString** 的函数和是否是空字符串的函数 **isEmpty**

```javascript
  let s = 56;
  console.log(stringUtils.isString(s));
  let s1 = ' ';
  console.log(stringUtils.isEmpty(s), stringUtils.isEmpty(s, false));
```

### utils
包括一组函数，
1. **isArray**: 判断是否是数组
2. **isFunction**: 判断是否是函数
3. **isAsyncFunction**: 判断是否是异步函数
4. **sleep**: 异步函数，暂停n秒，需要使用**await**调用