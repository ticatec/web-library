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



