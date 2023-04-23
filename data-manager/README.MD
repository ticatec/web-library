# Data Service and Data Manager

[中文文档](https://github.com/ticatec/web-library/blob/main/data-manager/README-CN.md)

# DataService

## BaseDataService
BaseDataService is a TypeScript class that provides a simple template for creating data services in a client-side application. It includes a static property, serverProxy, which can be set to a proxy object that will handle communication with a remote server. The class also includes a protected method, getService(), which returns the serverProxy.

### Usage
To use BaseDataService, you can extend the class and implement your own methods. For example:

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
In this example, MyDataService extends BaseDataService and provides its own implementation for the getUsers() and updateUser() methods. These methods use the getService() method to get a reference to the serverProxy object and then use it to make HTTP requests.

Before you can use MyDataService, you need to set the serverProxy property of BaseDataService. You can do this by calling the setProxy() method:

```typescript
import axios from 'axios';
import MyDataService from './MyDataService';

const serverProxy = axios.create({
  baseURL: 'https://api.example.com'
});

BaseDataService.setProxy(serverProxy);

const myDataService = new MyDataService();
```
In this example, we create a new Axios instance and use it to create the serverProxy. We then set the serverProxy property of BaseDataService to this instance. Finally, we create a new instance of MyDataService and can use it to make requests to our server.

### API
**BaseDataService.setProxy(value: any)**: void  
Sets the serverProxy property to the provided value.

**getService()**: any  
Returns the serverProxy property. This method is marked as protected, so it can only be accessed by classes that extend BaseDataService.


## CommonDataService

CommonDataService is an abstract TypeScript class that extends BaseDataService and provides a set of common data service methods that can be used to interact with a remote server. It includes methods for saving and deleting data.

### Usage
To use CommonDataService, you can extend the class and provide your own implementation for the getDeleteUrl() method. For example:

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
In this example, MyDataService extends CommonDataService and provides its own implementation for the getDeleteUrl() method. This method is used to generate the URL that will be used to delete an item.

To use MyDataService, you can create an instance of the class and use its save() and remove() methods to interact with the server:

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
In this example, we create a new instance of MyDataService and use its save() and remove() methods to interact with the server. The save() method takes two parameters: the data to be saved and a boolean value indicating whether the data is new or existing. The remove() method takes a single parameter: the item to be deleted.

### API
**CommonDataService(url: string)**  
Creates a new instance of CommonDataService with the specified URL.

**save(data: any, isNew: boolean): Promise<any>**  
Saves the specified data to the server. If isNew is true, a new item will be created. Otherwise, an existing item will be updated.

**remove(item: any): Promise<void>**  
Deletes the specified item from the server.

**getDeleteUrl(item: any): string**  
Generates the URL that will be used to delete the specified item. This method is marked as protected, so it can only be accessed by classes that extend CommonDataService.

## CommonPaginationDataService
CommonPaginationDataService is an abstract TypeScript class that extends CommonDataService and provides a method for searching and paginating data on a remote server.

### Usage
To use CommonPaginationDataService, you can extend the class and provide your own implementation for the buildCriteria() method. For example:

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
In this example, MyPaginationDataService extends CommonPaginationDataService and provides its own implementation for the buildCriteria() method. This method is used to generate the search criteria that will be sent to the server.

To use MyPaginationDataService, you can create an instance of the class and use its search() method to search and paginate data on the server:

```typescript
const myPaginationDataService = new MyPaginationDataService();

// Search for users
myPaginationDataService.search(myPaginationDataService.buildCriteria()).then((paginationList) => {
    console.log('Users found:', paginationList.data);
}).catch((error) => {
    console.error('Failed to search for users:', error);
});
```
In this example, we create a new instance of MyPaginationDataService and use its search() method to search for and paginate data on the server. The search() method takes a single parameter: the search criteria to be used.

### API
**CommonPaginationDataService(url: string)**  
Creates a new instance of CommonPaginationDataService with the specified URL.

**search(criteria: any): Promise<PaginationList>**  
Searches for and paginates data on the server based on the specified criteria. Returns a Promise that resolves to a PaginationList object containing the search results.

**buildCriteria(): any**  
Generates the search criteria that will be sent to the server. This method must be implemented by the class that extends CommonPaginationDataService.

# Data Manager

## BaseDataManager
The BaseDataManager class is a generic class that provides basic CRUD operations for managing a list of data. It defines methods for saving, removing, and modifying data in a local list and database through a specified CommonDataService. The BaseDataManager is designed to be extended and implemented for specific use cases.

### Usage
The BaseDataManager class can be extended and implemented to manage any type of data.

```typescript
import BaseDataManager from "./BaseDataManager";
import MyDataService from "./MyDataService";

export default class MyDataManager extends BaseDataManager<MyDataService> {

    constructor(service: MyDataService) {
        super(service, (e1, e2) => e1.id === e2.id);
    }
}

```

### Constructor
The BaseDataManager constructor requires the following parameters:

**service** - an instance of a CommonDataService subclass for handling the actual CRUD operations  
**checkEqual** - a function that takes two items and returns a boolean indicating whether they are equal. This function is used to identify items in the local list that need to be updated or removed.
Additionally, an optional convert parameter can be provided to convert the returned data before adding it to the local list.

### API

### public methods
**save(data: any, isNew: boolean): Promise<void>**  
saves data to the database and updates the local list. The isNew parameter indicates whether the data is new or an update to an existing item.

**remove(item: any): Promise<void>**  
removes the specified item from the database and the local list.

**list: Array<any>**  
returns a copy of the current local list.

### protected methods
**removeItem(item: any): void**  
removes the specified item from the local list.

**append(item: any): void**  
adds the specified item to the beginning of the local list.

**set list(value: Array<any>): void**  
sets the local list to the specified value.

## Common Pagination Data Manager
This module provides a CommonPaginationDataManager class that extends the BaseDataManager class. It is used for managing data that can be displayed on a paginated table.


Usage
To use this module, first import the CommonPaginationDataManager class and any required dependencies:
```typescript
import {BaseDataManager, DataConvert} from "@ticatec/app-data-manager";
import type {CheckEqual} from "@ticatec/data-manager";
import type {CommonPaginationDataService} from "@ticatec/app-data-manager";
import {utils} from "@ticatec/enhanced-utils";
```
Then, extend the CommonPaginationDataManager class and implement the processDataResult method:
```typescript
export default abstract class CommonPaginationDataManager<T extends CommonPaginationDataService> extends BaseDataManager<T> {
    
    constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        super(service, checkEqual, convert);
    }
}

```

### Methods
The CommonPaginationDataManager class provides the following methods:

**setRowsPerPage(value: number)**:
sets the number of rows per page.

**searchData(criteria: any, pageNo: number = 1)**:
searches for data based on the specified criteria and page number.

**setPageNo(value: number)**:
sets the current page number to the specified value.

**initialize()**:
initializes the data manager.

**resetSearch()**:
resets the search criteria.

**search(criteria)**:
searches for data based on the specified criteria.

**refresh()**:
refreshes the data.

**getPageNo():number**:
gets the current page number.

**getPageCount(): number**:
gets the total number of pages.

**getPageCount():number:**  
the total number of pages.

### Properties
The CommonPaginationDataManager class provides the following properties:

**criteria**: the current search criteria.


## StackDataManager

StackDataManager is an abstract class that extends CommonPaginationDataManager and adds the ability to load more data from the server.

### Usage

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

**constructor(service: T, checkEqual: CheckEqual, convert?: DataConvert)**
Constructs a new StackDataManager instance.  
**service** - The service to use for querying data.  
**checkEqual** - The function to use for comparing two objects.  
**convert** - The function to use for converting data from the server.

#### methods

**loadMore(): Promise<void>**
Loads the next page of data from the server.

**hasMore(): boolean**
Returns a boolean indicating if there is more data to be loaded.


