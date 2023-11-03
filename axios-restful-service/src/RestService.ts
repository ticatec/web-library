
import ApiError from "./ApiError";
import axios from "axios";

const TIMEOUT = 60 * 1000; //一分钟
export interface PreInterceptorResult {
    /**
     * 待增加的headers
     */
    headers: any;
    /**
     * 访问过期时间
     */
    timeout?: number;
}
export type DataProcessor = (data: any) => any;
export type PreInterceptor = (method: string, url: string) => PreInterceptorResult;
export type PostInterceptor = (data: any) => Promise<void>;
export type ErrorHandler = (ex: Error) => boolean;

const CONTENT_TYPE_NAME = 'Content-Type';
const TYPE_JSON = "application/json";

export default class RestService {

    private static debug: boolean = false;
    private readonly root;
    private readonly preInvoke: PreInterceptor;
    private readonly postInvoke: PostInterceptor;
    private readonly errorHandler: ErrorHandler;


    constructor(root: string, errorHandler: ErrorHandler = null, preInvoke: PreInterceptor = null, postInvoke: PostInterceptor = null) {
        this.root = root;
        this.errorHandler = errorHandler;
        this.preInvoke = preInvoke;
        this.postInvoke = postInvoke;
    }

    static setDebug(value: boolean): void {
        RestService.debug = value;
    }

    /**
     * 构建Web Request请求
     * @param url
     * @param method
     * @param params
     * @param data
     * @param isFormData
     * @protected
     */
    protected buildAxiosRequest(url: string, method: string, params: any, data: any = null, isFormData: boolean = false): any {
        let options: any = {
            method: method.toLowerCase(),
            url: `${this.root}${url}`,
            params,
            data,
            withCredentials: true,
            headers: {}
        }
        if (isFormData != true) {
            options.headers[CONTENT_TYPE_NAME] = TYPE_JSON;
        }
        let interceptorResult = this.preInvoke == null ? null : this.preInvoke(options.method, url);
        if (interceptorResult != null) {
            for (let key in (interceptorResult.headers || {})) {
                options.headers[key] = interceptorResult.headers[key]
            }
            options.timeout = interceptorResult.timeout || TIMEOUT
        }
        return options;
    }

    protected parseResponseData(data: any, contentType: string): any {
        if (typeof data == 'string') {
            data = data.trim();
            if (contentType?.includes(TYPE_JSON)) {
                data = JSON.parse(data);
            }
        }
        return data;
    }

    /**
     * 发起一个http请求
     * @param axiosConf
     * @param dataProcessor
     * @protected
     */
    protected async fetchData(axiosConf: any, dataProcessor: DataProcessor): Promise<any> {
        let ex;
        try {
            console.debug(axiosConf);
            const response:any = await axios(axiosConf);
            let data: any = this.parseResponseData(response.data, response.headers[CONTENT_TYPE_NAME]);
            if (response.status < 300) {
                if (dataProcessor) {
                    data = dataProcessor(data);
                    RestService.debug && console.debug("处理后的数据：", data);
                }
                if (this.postInvoke) {
                    data = await this.postInvoke(data);
                }
                return data;
            } else if (response.status >= 400) {
                ex = new ApiError(response.status, data);
            }
        } catch (reason) {
            ex = this.handleException(reason);
        }
        if (ex != null) {
            if (this.errorHandler != null) {
                this.errorHandler(ex);
            }
            throw ex;
        }
    }

    /**
     *
     * @param url
     * @param params
     * @param dataProcessor
     */
    async get(url: string, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        const axiosConf = this.buildAxiosRequest(url, 'GET', params);
        RestService.debug && console.debug("发送GET请求到", axiosConf);
        return await this.fetchData( axiosConf, dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async post(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        const axiosConf = this.buildAxiosRequest(url, 'POST', params, data);
        RestService.debug && console.debug("发送POST请求到", axiosConf);
        return await this.fetchData(axiosConf, dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async put(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        const axiosConf = this.buildAxiosRequest(url, 'PUT', params, data);
        RestService.debug && console.debug("发送PUT请求到", axiosConf);
        return await this.fetchData( axiosConf, dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async del(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        const axiosConf = this.buildAxiosRequest(url, 'DELETE', params, data);
        RestService.debug && console.debug("发送DELETE请求到", axiosConf);
        return await this.fetchData( axiosConf, dataProcessor);
    }

    /**
     * 上传单个文件
     * @param url
     * @param params
     * @param file
     * @param dataProcessor
     * @returns {Promise<*|string|null|undefined>}
     */
    async upload(url: string, params: any, file: File, dataProcessor: DataProcessor = null): Promise<any> {
        RestService.debug && console.debug("上传文件" + file.name);
        let formData = new FormData();
        formData.append('filename', file);
        let ex;
        try {
            const axiosConf = this.buildAxiosRequest(url, 'DELETE', params, formData, true);
            return await this.fetchData( axiosConf, dataProcessor);
        } catch (reason) {
            ex = this.handleException(reason);
        }
        if (ex != null) {
            if (this.errorHandler != null) {
                this.errorHandler(ex);
            }
            throw ex;
        }
    }

    private handleException(reason) {
        let response = reason.response!;
        if (response) {
            console.debug(response);
            return new ApiError(reason.response!.status, this.parseResponseData(response.data, response[CONTENT_TYPE_NAME]));
        } else {
            console.error("Failure:", reason);
            return new ApiError(-1, {code: 100});
        }
    }

    /**
     *
     * @param url
     * @param params
     * @param filename
     */
    async download(url, params, filename):Promise<any> {
        RestService.debug && console.debug("发送GET请求到" + url, "参数：", (params || '无'));
        let axiosConf = this.buildAxiosRequest(url,"get",  params, null, true);
        let ex;
        try {
            let response:any = await axios(axiosConf);
            let a = document.createElement("a");
            a.href = window.URL.createObjectURL(response.data);
            a.download = filename;
            a.click();
        } catch (reason) {
            ex = this.handleException(reason);
        }
        if (ex != null) {
            if (this.errorHandler != null) {
                this.errorHandler(ex);
            }
            throw ex;
        }
    };

}