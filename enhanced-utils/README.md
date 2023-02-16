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

const escapedHtml = utils.escapeHtml("<p>Hello, world!</p>");
console.log(escapedHtml); // logs "&lt;p&gt;Hello, world!&lt;/p&gt;"

```

### API
**isArray(data: any): boolean**  
Checks whether the given value is an array.

**isFunction(fun: any): boolean**  
Checks whether the given value is a function.

**isAsyncFunction(fun: any): boolean**  
Checks whether the given value is an async function.

**sleep(n: number): Promise<void>**  
Pauses the program for the specified number of seconds (n).

**escapeHtml(text: string): string**  
Escapes HTML special characters in the given string.

## Object Extension
it extends the Object class with the following functions:

**clone()**
This function returns a deep copy of the object.

```typescript
const obj = { a: 1, b: 2 };
const copy = obj.clone();
console.log(copy); // { a: 1, b: 2 }
```

**purge(strict: boolean)**  
This function returns a new object with all empty properties removed. If the strict parameter is set to true, properties that only contain whitespace will also be removed.
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