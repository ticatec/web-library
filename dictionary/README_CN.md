# 数据字典管理库

## 数据字典管理器
本软件包包含一个数据字典管理器，负责管理一组数据字典。管理器允许注册、初始化和刷新数据字典。

### 安装
可以使用npm安装软件包:

```shell
npm install @ticatec/dictionary
```
### 使用
要使用数据字典管理器，您需要先引入dicManager类的实例，这个是个单例类:

```typescript
import dicManager from '@ticatec/dictionary';
```


**注册字典**  
可以使用register方法向管理器注册新的数据字典。此方法需要两个参数：用于标识字典的键，以及Dictionary类的实例:

```typescript
import {Dictionary} from '@ticatec/dictionary';

const myDictionary = new Dictionary(/* ... */);
myDicManager.register('myDictionary', myDictionary);
```

**初始化字典**  
要初始化一组字典，可以使用initialize方法。此方法需要一个键数组，对应您要初始化的字典:

```typescript
await myDicManager.initialize(['myDictionary']);
```

**刷新字典**  
要刷新单个字典，可以使用refresh方法。此方法需要一个参数：要刷新的字典的键:

```typescript
await myDicManager.refresh('myDictionary');
```

**获取字典**  
要检索字典，可以使用get方法。此方法需要一个参数：要检索的字典的键:

```typescript
const myDictionary = await myDicManager.get('myDictionary');
```

## Dictionary Class
该类代表一个可以用于根据它们的唯一键存储和检索一组对象的字典。它提供了加载数据到字典中、访问字典中存储的数据以及按需操作数据的方法。

### 使用方法
要使用此类，您需要将其导入，如下所示:

```typescript
import {Dictionary, DataLoader, GetText} from "@ticatec/Dictionary";
```

**创建新字典**  
要创建新字典，您需要创建一个Dictionary类的实例。您需要提供一个数据加载器函数、一个键名称、一个用于检索项目文本的函数以及一个默认的缺失文本。

```typescript
const dictionary = new Dictionary(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string);
```

**重新加载数据**  
要重新加载字典中的数据，您可以使用reload()方法。此方法将使用数据加载器函数获取数据，并使用新数据重建字典。

```typescript
await dictionary.reload();
```

**访问数据**  
您可以使用get()方法访问字典中的数据。此方法将一个键作为参数，并返回字典中相应的对象。

```typescript
const item = dictionary.get(key);
```

您还可以使用getValue()方法检索字典中项目的文本值。此方法将一个键作为参数，并返回相应项目的文本值。

```typescript
const textValue = dictionary.getValue(key);
```

**对象列表属性**  
要获取存储在字典中的所有对象的列表，您可以直接方法list属性。

```typescript
const list = dictionary.list;
```

**获取对象列表**  
要获取存储在字典中的所有对象的列表，您可以使用toList()方法。此方法等同于list属性

```typescript
const list = dictionary.toList();
```

**检查字典是否已初始化**  
您可以使用initialized属性检查是否已使用数据进行初始化。

```typescript
if (dictionary.initialized) {
// dictionary has been initialized with data
}
```

**使字典无效**  
要使字典中的数据失效并强制它在下次访问时重新加载数据，您可以使用invalidate()方法。

```typescript
dictionary.invalidate();
```

## TreeDictionary
这是一个 TypeScript 类，扩展了 Dictionary 类，并提供了额外的功能，将分层数据结构表示为字典。它提供了构建和遍历数据层次结构的方法，以及检索特定节点的叶节点和子节点。

### 使用方法
```typescript
import TreeDictionary from '@ticatec/tree-dictionary';

// 定义一个DataLoader来异步获取数据
const loadData: DataLoader = async () => {
const response = await fetch('/data.json');
const data = await response.json();
return data;
};

// 定义一个函数来确定一个节点是否为叶节点
const isLeaf = (item: any) => item.children == null || item.children.length === 0;

// 创建一个新的 TreeDictionary 实例
const treeDictionary = new TreeDictionary(loadData, 'id', 'name', 'Unknown', isLeaf);

// 重新加载数据并等待它完成加载
await treeDictionary.reload();

// 获取所有叶节点的列表
const leafs = treeDictionary.leafs;

// 获取特定节点的子节点
const children = treeDictionary.getChildren('node-id');
```

### API
####  constructor(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string, isLeaf: IsLeaf)
构造 TreeDictionary 的一个新实例。参数：

**loader:** 一个返回一个 Promise 的函数，该 Promise 解析为项数组。这个函数负责加载字典的数据。  
**keyName:** 包含每个项的唯一标识符的属性的名称。  
**getText:** 一个检索每个项要显示的文本的字符串或函数。  
**missingText:** 当未找到项时显示的文本。
**isLeaf:** 一个以项为参数并返回一个布尔值指示它是否为叶节点的函数。

#### reload(): Promise<void>
重新加载字典的数据。如果数据已经正在加载，此方法返回一个 Promise，在加载完成时解决。

#### leafs: Array<any>
获取层次结构中所有叶节点的数组。如果尚未加载数据，则此方法会抛出一个错误。

#### getChildren(key: string): Array<any>
获取具有指定键的节点的子节点数组。如果未找到节点或节点没有子节点，则返回一个空数组。如果尚未加载数据，则此方法会抛出一个错误。

#### Inherited methods from Dictionary
list，toList()，get(key: string)，getValue(key: string)，initialized，invalidate()。

**许可证**
此项目根据 MIT 许可证许可。

**贡献**
我们欢迎对此软件包的贡献！如果您有功能想法或想报告错误，请打开一个问题。如果您想贡献代码，请 fork 代码库并创建一个 pull 请求。