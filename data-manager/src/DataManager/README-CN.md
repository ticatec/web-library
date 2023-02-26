# Data Manager

## BaseDataManager
BaseDataManager是一个通用类，提供了用于管理数据列表的基本CRUD操作。它定义了在本地列表和数据库中保存、删除和修改数据的方法，并通过指定的CommonDataService。BaseDataManager被设计为针对特定用例进行扩展和实现。


### 用法
BaseDataManager类可以被扩展和实现来管理任何类型的数据。

```typescript
import BaseDataManager from "./BaseDataManager";
import MyDataService from "./MyDataService";

export default class MyDataManager extends BaseDataManager<MyDataService> {

    constructor(service: MyDataService) {
        super(service, (e1, e2) => e1.id === e2.id);
    }
}

```

### 构造函数
BaseDataManager构造函数需要以下参数：

**service** - 用于处理实际CRUD操作的CommonDataService子类的实例
**checkEqual** - 一个函数，它接受两个项并返回一个布尔值，指示它们是否相等。该函数用于识别需要更新或删除的本地列表中的项。
此外，还可以提供可选的**convert**参数以将返回的数据转换为添加到本地列表中。

### API

### 公共方法
**save(data: any, isNew: boolean): Promise<void>**  
将数据保存到数据库并更新本地列表。isNew参数指示数据是新数据还是对现有项的更新。

**remove(item: any): Promise<void>**  
从数据库和本地列表中删除指定的项。

**list: Array<any>**  
返回当前本地列表的副本。

### 受保护的方法
**removeItem(item: any): void**  
从本地列表中删除指定的项。  

**append(item: any): void**  
将指定的项添加到本地列表的开头。 

**set list(value: Array<any>): void**  
将本地列表设置为指定的值。

## Common Pagination Data Manager
这个模块提供了一个CommonPaginationDataManager类，它继承了BaseDataManager类。它用于管理可以在分页表格上显示的数据。

### 用法
要使用这个模块，首先导入CommonPaginationDataManager类和任何必需的依赖项：

```typescript
import {BaseDataManager, DataConvert} from "@ticatec/app-data-manager";
import type {CheckEqual} from "@ticatec/data-manager";
import type {CommonPaginationDataService} from "@ticatec/app-data-manager";
import {utils} from "@ticatec/enhanced-utils";
```
然后，扩展CommonPaginationDataManager类并实现processDataResult方法：

```typescript
export default abstract class CommonPaginationDataManager<T extends CommonPaginationDataService> extends BaseDataManager<T> {

    constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        super(service, checkEqual, convert);
    }


}

```

### 方法
CommonPaginationDataManager 类提供以下方法：

**setRowsPerPage(value: number)**:
设置每页行数。

**searchData(criteria: any, pageNo: number = 1)**:
基于指定的搜索条件和页码搜索数据。

**setPageNo(value: number)**:
将当前页码设置为指定的值。

**initialize()**:
初始化数据管理器。

**resetSearch()**:
重置搜索条件。

**search(criteria)**:
基于指定的搜索条件搜索数据。

**refresh()**:
刷新数据。

**getPageNo():number**:
获取当前页码。

**getPageCount(): number**:
获取总页数。

### 属性
CommonPaginationDataManager提供以下属性：

**criteria**: 当前的查询条件


## StackDataManager

StackDataManager 是一个抽象类，它扩展了 CommonPaginationDataManager 并添加了从服务器加载更多数据的功能。

### 使用方法

```typescript
import {StackDataManager} from "@ticatec/app-data-manager";
import type {CheckEqual} from "@ticatec/app-data-manager";
import type {CommonPaginationDataService} from "@ticatec/app-data-manager";

class ExampleDataManager extends StackDataManager<CommonPaginationDataService> {
    constructor(service: CommonPaginationDataService, checkEqual: CheckEqual) {
        super(service, checkEqual);
    }
}
```

### API

### constructor
**StackDataManager(service: T, checkEqual: CheckEqual, convert?: DataConvert)**
构造一个新的 StackDataManager 实例。  
**service** - 用于查询数据的服务。  
**checkEqual** - 用于比较两个对象的函数。  
**convert** - 用于将服务器上的数据转换的函数。  

#### 方法

**loadMore(): Promise<void>**
读取下一页的数据

**hasMore(): boolean**
是否还有更多待读取的数据

