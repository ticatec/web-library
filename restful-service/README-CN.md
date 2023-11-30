# RestService

[Englis Document](./README.md)

RestService 是一个设计用于简化和优化使用 Fetch API 进行 HTTP 请求的 JavaScript 类。它提供了常见 HTTP 操作的方法，如 GET、POST、PUT、DELETE，以及文件上传和下载。该类通过拦截器、错误处理和响应处理的选项进行配置。

## 安装
要使用 RestService，您需要在项目中包含 utils.js 文件和 ApiError.js 文件。然后，在您的代码中导入 RestService：

```javascript
import RestService from "./RestService";
```

## 使用
初始化 RestService
```javascript
const restService = new RestService(root, errorHandler, preInvoke, responseHandler, postInvoke);
```
**root**: API 的基础 URL。
**errorHandler**:（可选）处理错误的函数。
**preInvoke**:（可选）在每次 API 调用之前调用的函数，用于自定义头部操作。
**responseHandler**:（可选） 用于在将响应传递回调用代码之前处理响应的函数。
**postInvoke**:（可选）在接收响应后进行额外处理的函数。

## 启用调试模式
```javascript
RestService.setDebug(true);
```

启用调试模式以将附加信息记录到控制台。

## 进行 HTTP 请求

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
```javascript
const data = await restService.del(url, data, params, dataProcessor);
```

**文件上传**
```javascript
const data = await restService.upload(url, params, file, dataProcessor);
```

**文件下载**
```javascript
await restService.download(url, params, filename);
```

## 拦截器
**preInvoke**: 在每个 HTTP 请求之前执行，以操纵头部。  
**postInvoke**: 在接收到响应后执行额外的处理。  
## 错误处理
错误使用 ApiError 类封装，提供有关错误的详细信息。  
**示例**
```javascript
const restService = new RestService("https://api.example.com", handleApiError, addCustomHeaders, processResponse);
RestService.setDebug(true);

const data = await restService.get("/endpoint");
const postData = await restService.post("/endpoint", { key: "value" });
const fileData = await restService.upload("/upload", { key: "value" }, file);
await restService.download("/download", { key: "value" }, "output.txt");
```
## 许可证
此代码根据 MIT 许可证提供。

## 问题和贡献
如果您遇到任何问题或想要贡献，请在 GitHub 存储库上打开问题或创建拉取请求。