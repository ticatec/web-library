# RestService

[中文文档](./README-CN.md)

RestService is a JavaScript class designed to simplify and streamline HTTP requests using the Fetch API. It provides methods for common HTTP operations such as GET, POST, PUT, DELETE, as well as file upload and download. The class is configured with options for interceptors, error handling, and response processing.

## Installation
To use RestService, you need to include the utils.js file and the ApiError.js file in your project. Then, import RestService in your code:

```js
import RestService from "./RestService";
```

## Usage

### Initializing RestService
```js
    const restService = new RestService(root, errorHandler, preInvoke, responseHandler, postInvoke);
```
**root**: The base URL for the API.  
**errorHandler**: (Optional) A function that handles errors.  
**preInvoke**: (Optional) A function called before each API call for custom header manipulation.  
**responseHandler**: (Optional) A function to process the response before passing it back to the calling code.
**postInvoke**: (Optional) A function called after receiving the response for additional processing. 

### Enabling Debug Mode
javascript
```js
RestService.setDebug(true);
```
Enable debug mode to log additional information to the console.

### Making HTTP Requests

**GET**
```javascript
const data = await restService.get(url, params, dataProcessor);
```

**POST**
```javascript
const data = await restService.post(url, data, params, dataProcessor);
```
**PUT**

```javascript
const data = await restService.put(url, data, params, dataProcessor);
```
**DELETE**
```js
const data = await restService.del(url, data, params, dataProcessor);
```

**File Upload**
```js
const data = await restService.upload(url, params, file, dataProcessor);
```

**File Download**

```javascript
await restService.download(url, params, filename);
```

## Interceptors
**preInvoke**: Executed before each HTTP request to manipulate headers.  
**postInvoke**: Executed after receiving a response for additional processing.

## Error Handling
Errors are encapsulated using the ApiError class, providing detailed information about the error.
Examples

```js
const restService = new RestService("https://api.example.com", handleApiError, addCustomHeaders, processResponse);
RestService.setDebug(true);

const data = await restService.get("/endpoint");
const postData = await restService.post("/endpoint", { key: "value" });
const fileData = await restService.upload("/upload", { key: "value" }, file);
await restService.download("/download", { key: "value" }, "output.txt");
```

License
This code is provided under the MIT License.

Issues and Contributions
If you encounter any issues or would like to contribute, please open an issue or create a pull request on the GitHub repository.