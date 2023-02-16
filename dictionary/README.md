# Dictionary Manager Library

[中文说明](https://github.com/ticatec/web-library/blob/main/dictionary/README_CN.md)

## Dictionary Manager
This package contains a Dictionary Manager, which is responsible for managing a collection of data dictionaries. The manager allows for the registration, initialization, and refresh of data dictionaries.

### Installation
You can install the package using npm:

```shell
npm install @ticatec/dictionary
```
### Usage
To use the Dictionary Manager, you will first need to import the instance of the DicManager class which is a singleton class:

```typescript
import dicManager from '@ticatec/dictionary';
```


**Registering a Dictionary**  
You can register a new dictionary with the manager using the register method. This method takes two arguments: a key to identify the dictionary, and an instance of the Dictionary class:

```typescript
import {Dictionary} from '@ticatec/dictionary';

const myDictionary = new Dictionary(/* ... */);
myDicManager.register('myDictionary', myDictionary);
```

**Initializing Dictionaries**  
To initialize a group of dictionaries, you can use the initialize method. This method takes an array of keys that correspond to the dictionaries you want to initialize:

```typescript
await myDicManager.initialize(['myDictionary']);
```

**Refreshing a Dictionary**  
To refresh a single dictionary, you can use the refresh method. This method takes a single argument: the key of the dictionary to refresh:

```typescript
await myDicManager.refresh('myDictionary');
```

**Getting a Dictionary**  
To retrieve a dictionary, you can use the get method. This method takes a single argument: the key of the dictionary to retrieve:

```typescript
const myDictionary = await myDicManager.get('myDictionary');
```

## Dictionary Class
This class represents a dictionary that can be used to store and retrieve a collection of objects based on their unique keys. It provides methods to load the dictionary with data, access the data stored in the dictionary, and manipulate the data as needed.


### Usage
To use this class, you will need to import it as follows:

```typescript
import {Dictionary, DataLoader, GetText} from "@ticatec/Dictionary";
```

**Creating a new dictionary**  
To create a new dictionary, you will need to create an instance of the Dictionary class. You will need to provide a data loader function, a key name, a function to retrieve the text for an item, and a default missing text.

```typescript
const dictionary = new Dictionary(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string);
```

**Reloading data**  
To reload data in the dictionary, you can use the reload() method. This method will fetch the data using the data loader function and rebuild the dictionary with the new data.

```typescript
await dictionary.reload();
```

**Accessing data**  
You can access the data in the dictionary using the get() method. This method takes a key as a parameter and returns the corresponding object in the dictionary.

```typescript
const item = dictionary.get(key);
```

You can also retrieve the text value for an item in the dictionary using the getValue() method. This method takes a key as a parameter and returns the corresponding text value for the item.

```typescript
const textValue = dictionary.getValue(key);
```
**Getting the list of objects**  
To get a list of all the objects stored in the dictionary, you can use the toList() method.

```typescript
const list = dictionary.toList();
```

**Checking if the dictionary is initialized**  
You can check if the dictionary has been initialized with data using the initialized property.

```typescript
if (dictionary.initialized) {
// dictionary has been initialized with data
}
```

**Invalidating the dictionary**  
To invalidate the data in the dictionary and force it to reload the data the next time it is accessed, you can use the invalidate() method.

```typescript
dictionary.invalidate();
```

## TreeDictionary
This is a TypeScript class that extends the Dictionary class and provides additional functionality to represent a hierarchical data structure as a dictionary. It provides methods to build and traverse the hierarchy of data, as well as retrieve the leaf nodes and children of a specific node.

### Usage
```typescript
import TreeDictionary from '@ticatec/tree-dictionary';

// Define a DataLoader to asynchronously retrieve the data
const loadData: DataLoader = async () => {
const response = await fetch('/data.json');
const data = await response.json();
return data;
};

// Define a function to determine if a node is a leaf node
const isLeaf = (item: any) => item.children == null || item.children.length === 0;

// Create a new TreeDictionary instance
const treeDictionary = new TreeDictionary(loadData, 'id', 'name', 'Unknown', isLeaf);

// Reload the data and wait for it to finish loading
await treeDictionary.reload();

// Get the list of all leaf nodes
const leafs = treeDictionary.leafs;

// Get the children of a specific node
const children = treeDictionary.getChildren('node-id');
```

### API
####  constructor(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string, isLeaf: IsLeaf)  
Constructs a new instance of TreeDictionary. Parameters:

**loader:** A function that returns a Promise that resolves to an array of items. This function is responsible for loading the data for the dictionary.  
**keyName:** The name of the property that contains the unique identifier of each item.  
**getText:** A string or a function that retrieves the text to display for each item.  
**missingText:** The text to display when an item is not found.  

#### isLeaf: 
A function that takes an item as a parameter and returns a boolean indicating whether it is a leaf node.

#### reload(): Promise<void>
Reloads the data for the dictionary. If the data is already being loaded, this method returns a Promise that resolves when the loading is complete.

#### leafs: Array<any>
Gets an array of all the leaf nodes in the hierarchy. If the data has not been loaded yet, this method throws an error.

#### getChildren(key: string): Array<any>
Gets an array of the children of the node with the specified key. If the node is not found, or if it has no children, an empty array is returned. If the data has not been loaded yet, this method throws an error.

#### Inherited methods from Dictionary
list, toList(), get(key: string), getValue(key: string), initialized, invalidate().

**License**
This project is licensed under the MIT license.

**Contributing**
We welcome contributions to this package! If you have an idea for a feature or would like to report a bug, please open an issue. If you'd like to contribute code, please fork the repository and create a pull request.