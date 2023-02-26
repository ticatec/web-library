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

# DataService

## BaseDataService
BaseDataService是一个TypeScript类，为客户端应用程序创建数据服务提供了一个简单的模板。它包括一个静态属性serverProxy，可以设置为处理与远程服务器通信的代理对象。该类还包括一个受保护的方法getService()，它返回serverProxy。

### 使用方法
要使用BaseDataService，可以扩展该类并实现自己的方法。例如：

```typescript
import {BaseDataService} from '@ticatec/data-manager';

class MyDataService extends BaseDataService {
  getUsers(): Promise<any[]> {
    const service = this.getService();
    return service.get('/users');
  }

  updateUser(id: number, data: any): Promise<any> {
    const service = this.getService();
    return service.put(`/users/${id}`, data);
  }
}
```
在此示例中，MyDataService扩展了BaseDataService并为getUsers()和updateUser()方法提供了自己的实现。这些方法使用getService()方法获取对serverProxy对象的引用，然后使用它进行HTTP请求。

在使用MyDataService之前，您需要设置BaseDataService的serverProxy属性。您可以通过调用setProxy()方法来实现：

```typescript
import axios from 'axios';
import MyDataService from './MyDataService';

const serverProxy = axios.create({
  baseURL: 'https://api.example.com'
});

BaseDataService.setProxy(serverProxy);

const myDataService = new MyDataService();
```
在这个示例中，我们创建了一个新的Axios实例并使用它创建了serverProxy。然后，我们将BaseDataService的serverProxy属性设置为这个实例。最后，我们创建了一个新的MyDataService实例，并可以使用它来向我们的服务器发出请求。

### API
**BaseDataService.setProxy(value: any)**: void  
将serverProxy属性设置为提供的值。

**getService()**: any  
返回serverProxy属性。这个方法被标记为受保护的，因此只能被扩展BaseDataService的类访问。


## CommonDataService

CommonDataService是一个抽象的TypeScript类，它扩展了BaseDataService，并提供了一组常见的数据服务方法，可用于与远程服务器交互。它包括保存和删除数据的方法。

### 使用方法
要使用CommonDataService，您可以扩展该类并为getDeleteUrl()方法提供自己的实现。例如：

```typescript
import {CommonDataService} from '@ticatec/data-manager';

class MyDataService extends CommonDataService {
  constructor() {
    super('/users');
  }

  getDeleteUrl(item: any): string {
    return `${this.url}/${item.id}`;
  }
}
```
在这个例子中，MyDataService扩展了CommonDataService，并为getDeleteUrl()方法提供了自己的实现。这个方法用于生成将用于删除项的URL。

要使用MyDataService，您可以创建该类的一个实例，并使用它的save()和remove()方法与服务器交互：

```typescript
const myDataService = new MyDataService();

// Create a new user
myDataService.save({ name: 'John Doe', email: 'john.doe@example.com' }, true).then((response) => {
    console.log('User created:', response.data);
}).catch((error) => {
    console.error('Failed to create user:', error);
});

// Update an existing user
myDataService.save({ id: 1, name: 'Jane Smith', email: 'jane.smith@example.com' }, false).then((response) => {
    console.log('User updated:', response.data);
}).catch((error) => {
    console.error('Failed to update user:', error);
});

// Delete a user
const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
myDataService.remove(user).then(() => {
    console.log('User deleted:', user);
}).catch((error) => {
    console.error('Failed to delete user:', error);
});
```
在这个例子中，我们创建了一个MyDataService的新实例，并使用它的save()和remove()方法与服务器交互。save()方法需要两个参数：要保存的数据和一个布尔值，指示数据是新的还是现有的。remove()方法需要一个参数：要删除的项。

### API
**CommonDataService(url: string)**  
使用指定的URL创建一个新的CommonDataService实例。

**save(data: any, isNew: boolean): Promise<any>**  
将指定的数据保存到服务器。如果isNew为true，将创建一个新项。否则，将更新现有项。

**remove(item: any): Promise<void>**  
从服务器中删除指定的项。

**getDeleteUrl(item: any): string**  
生成将用于删除指定项的URL。这个方法被标记为受保护的，因此只能被扩展CommonDataService的类访问。

## CommonPaginationDataService
CommonPaginationDataService 是一个抽象的 TypeScript 类，它继承了 CommonDataService 并提供了一种在远程服务器上搜索和分页数据的方法。

### 用法
要使用 CommonPaginationDataService，你可以扩展该类并为 buildCriteria() 方法提供自己的实现。例如：

```typescript
import {CommonPaginationDataService} from '@ticatec/data-manager';

class MyPaginationDataService extends CommonPaginationDataService {
    constructor() {
    super('/users');
}

    buildCriteria(): any {
        return { page: 1, size: 10 };
    }
}
```
在这个例子中，MyPaginationDataService 扩展了 CommonPaginationDataService 并为 buildCriteria() 方法提供了自己的实现。该方法用于生成将发送到服务器的搜索条件。

要使用 MyPaginationDataService，可以创建该类的一个实例并使用其 search() 方法在服务器上搜索和分页数据：

```typescript
const myPaginationDataService = new MyPaginationDataService();

// Search for users
myPaginationDataService.search(myPaginationDataService.buildCriteria()).then((paginationList) => {
    console.log('Users found:', paginationList.data);
}).catch((error) => {
    console.error('Failed to search for users:', error);
});
```
在这个例子中，我们创建了一个 MyPaginationDataService 的新实例，并使用其 search() 方法在服务器上搜索和分页数据。search() 方法接受一个参数：要使用的搜索条件。

### API
**CommonPaginationDataService(url: string)**  
使用指定的 URL 创建 CommonPaginationDataService 的新实例。

**search(criteria: any): Promise<PaginationList>**  
根据指定的条件在服务器上搜索和分页数据。返回一个 Promise，解析为包含搜索结果的 PaginationList 对象。

**buildCriteria(): any**  
生成将发送到服务器的搜索条件。该方法必须由扩展 CommonPaginationDataService 的类实现。



