# Enhanced Utils

[中文版说明](https://github.com/ticatec/web-library/blob/main/enhanced-utils/README-CN.md)

## Installation
You can install the library via npm:
```shell
npm install @ticatec/enhanced-utils
```

or 
```shell
yarn add @ticatec/enhanced-utils
```

## StringUtils
This is a simple JavaScript library that provides utility functions to work with strings.

### Usage
```typescript
import {stringUtils} from '@ticatec/enchance-utils/stringUtils';
```

**isString(s: any)**  
This function takes any value as input and returns true if the input is a string and false otherwise.

Example:
```typescript
stringUtils.isString('hello world'); // returns true
stringUtils.isString(123); // returns false
```

**isEmpty(s: string, strict: boolean = true)**  
This function takes a string and an optional boolean parameter as input. It returns true if the string is empty or contains only whitespace characters. If the strict parameter is set to true (the default), then leading and trailing whitespace characters are also considered when determining if the string is empty.
```typescript
stringUtils.isEmpty('  '); // returns true
stringUtils.isEmpty('  ', false); // returns false
stringUtils.isEmpty('  hello  '); // returns true
stringUtils.isEmpty('  hello  ', false); // returns false
```

**escapeHtml(text: string): string**  
Escapes HTML special characters in the given string.

```typescript
const escapedHtml = utils.escapeHtml("<p>Hello, world!</p>");
console.log(escapedHtml); // logs "&lt;p&gt;Hello, world!&lt;/p&gt;"

```
## Utils
This is a library of utility functions that can be used to enhance the functionality of your TypeScript code.  

### Usage
Import the utility functions you need from the package, like this:
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

const sourceObj = {
    name: 'John Doe',
    age: 28,
    address: null,
    emptyString: '',
    emptyArray: [],
    interests: ['sports', 'music']
};

// Clone an object
const clonedObj = clone(sourceObj);

// Clean up an object and remove null values, empty strings, and empty arrays
const purgedObj = objectPurge(sourceObj);

// Merge two objects by copying specific properties from the source object to the destination object
const destObj = { name: 'Jane Doe', age: 25 };
const props = ['name', 'interests'];
objectMerge(destObj, sourceObj, props);


```

### API
**isArray(data: any): boolean**  
Checks whether the given value is an array.

**isFunction(fun: any): boolean**  
Checks whether the given value is a function.

**isObject(value: any): boolean**
Checks where the given value is an object.

**isAsyncFunction(fun: any): boolean**  
Checks whether the given value is an async function.

**sleep(n: number): Promise<void>**  
Pauses the program for the specified number of seconds (n).

**clone(obj: any): any**
Creates a deep copy of an object.

**objectPurge(obj: any, strict?: boolean): any**
Removes null values, empty strings, and empty arrays from an object.

**objectMerge(dest: any, src: any, props?: string[]): void**
Copies specific properties from the source object to the destination object. If props is not provided, all properties of the source object will be copied.

## Array Extension

This is a TypeScript code extension for JavaScript Arrays that provides additional functionality.

### Features
This extension provides the following features to JavaScript Arrays:

**remove(elem: T): boolean**  
Removes the matching element from the array, and returns true if an element was successfully removed, or false if the element was not found.

**replace(elem: T, match: ObjectEqual): boolean**  
Replaces the matching element in the array with the new element. Returns true if the element was found and replaced, or false if the element was not found.

**union(list: Array<T>, match: ObjectEqual): void**  
Merges the target array with another array, while removing duplicates based on a matching function.

### Usage
This extension can be used by copying and pasting the code, or by importing the module. Once installed, the new functions can be accessed from any array instance.

```typescript
import '@ticatec/enchance-utils';

let arr = [1,2,3];
arr.remove(1); // returns true and the array now is [2,3]

arr.replace(2, (e1, e2) => e1 === e2); // returns true and the array now is [1, 2, 3]

let arr2 = [4,5,6];
arr.union(arr2, (e1, e2) => e1 === e2); // returns void and the array now is [1, 2, 3, 4, 5, 6]

```

License  
The Enhanced-Utils is [MIT licensed](https://github.com/ticatec/web-library/blob/main/LICENSE).