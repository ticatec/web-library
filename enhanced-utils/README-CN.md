# Enhanced Utils

## 安装
你可以通过 npm 安装库:
```shell
npm install @ticatec/enhanced-utils
```

或者
```shell
yarn add @ticatec/enhanced-utils
```

## StringUtils
这是一个简单的 JavaScript 库，提供了用于处理字符串的实用函数

### 使用方法
```typescript
import {stringUtils} from '@ticatec/enchance-utils/stringUtils';
```

**isString(s: any)**  
此函数以任何值作为输入，并在输入为字符串时返回 true，否则返回 false。

示例:
```typescript
stringUtils.isString('hello world'); // returns true
stringUtils.isString(123); // returns false
```

**isEmpty(s: string, strict: boolean = true)**  
此函数以字符串和可选的布尔参数作为输入。如果字符串为空或仅包含空格字符，则返回 true。如果 strict 参数设置为 true（默认值），则在确定字符串是否为空时，前导和尾随空格字符也会被考虑。
```typescript
stringUtils.isEmpty('  '); // returns true
stringUtils.isEmpty('  ', false); // returns false
stringUtils.isEmpty('  hello  '); // returns true
stringUtils.isEmpty('  hello  ', false); // returns false
```

## Utils
这是一个实用函数库，可用于增强 TypeScript 代码的功能。

### 使用方法
从包中导入所需的实用程序函数，如下所示：
```typescript
import { utils } from '@ticatec/enhanced-utils';
```

```typescript
if (utils.isArray(myArray)) {
    // do something with the array
}

if (utils.isFunction(myFunction)) {
    // call the function
}

if (utils.isAsyncFunction(myAsyncFunction)) {
    // call the async function
}

await utils.sleep(5); // pause the program for 5 seconds

const escapedHtml = utils.escapeHtml("<p>Hello, world!</p>");
console.log(escapedHtml); // logs "&lt;p&gt;Hello, world!&lt;/p&gt;"

```

### API
**isArray(data: any): boolean**  
检查给定值是否为数组。

**isFunction(fun: any): boolean**  
检查给定值是否为函数。

**isAsyncFunction(fun: any): boolean**  
检查给定值是否为异步函数。

**sleep(n: number): Promise<void>**  
暂停程序指定的秒数（n）。

**escapeHtml(text: string): string**  
在给定字符串中转义 HTML 特殊字符。

## 类扩展
它扩展了 Object 类，提供以下函数：

**clone()**
此函数返回对象的深拷贝。

```typescript
const obj = { a: 1, b: 2 };
const copy = obj.clone();
console.log(copy); // { a: 1, b: 2 }
```

**purge(strict: boolean)**  
此函数返回一个新对象，其中删除了所有空属性。如果 strict 参数设置为 true，则仅包含空格的属性也将被删除。

```typescript
const obj = { a: '', b: '  ', c: null, d: [1, 2, 3], e: {} };
const purged = obj.purge();
console.log(purged); // { d: [1, 2, 3], e: {} }
```

**merge(from: any, props: Array<string>)**  
This function merges the properties of the from object into the current object. The props parameter is an optional array of property names to merge. If it is not specified, all properties will be merged.

```typescript
const obj = { a: 1, b: 2 };
const from = { b: 3, c: 4 };
obj.merge(from);
console.log(obj); // { a: 1, b: 3, c: 4 }
```

## 数组扩展

这是一个 TypeScript 代码扩展，为 JavaScript 数组提供额外的功能。

### 特性
这个扩展为 JavaScript 数组提供以下功能：

**remove(elem: T): boolean**  
从数组中删除匹配的元素，并在成功删除一个元素时返回 true，如果未找到该元素则返回 false。

**replace(elem: T, match: ObjectEqual): boolean**  
用新元素替换数组中的匹配元素。如果找到并替换了该元素，则返回 true，否则返回 false。

**union(list: Array<T>, match: ObjectEqual): void**  
将目标数组与另一个数组合并，同时基于匹配函数删除重复项。

### Usage
这个扩展可以通过复制和粘贴代码或导入模块来使用。一旦安装，就可以从任何数组实例中访问新函数。

```typescript
import '@ticatec/enchance-utils';

let arr = [1,2,3];
arr.remove(1); // returns true and the array now is [2,3]

arr.replace(2, (e1, e2) => e1 === e2); // returns true and the array now is [1, 2, 3]

let arr2 = [4,5,6];
arr.union(arr2, (e1, e2) => e1 === e2); // returns void and the array now is [1, 2, 3, 4, 5, 6]

```

许可证  
The Enhanced-Utils is [MIT licensed](https://github.com/ticatec/web-library/blob/main/LICENSE).