import Utils from "./utils";
import ApiError from "./ApiError";

export type DataProcessor = (data: any) => any;
export type PreInterceptor = (headers: Headers, method: string | null, url: string | null) => void;
export type PostInterceptor = (data: any) => Promise<void>;
export type ErrorHandler = (ex: Error) => boolean;

const TAG: string = 'RestService';
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
     * @param options
     * @param isFormData
     * @protected
     */
    protected buildRequest(url: string, options: any, isFormData:any): Request {
        options.headers = options.headers || new Headers();
        if (isFormData == null) {
            if (options.headers.get(CONTENT_TYPE_NAME) == null) {
                options.headers.append(CONTENT_TYPE_NAME, TYPE_JSON);
            }
        }
        if (this.preInvoke != null) {
            this.preInvoke(options.headers, options.method, url);
        }
        return new Request(this.root + url, options);
    }

    /**
     * 发起一个http请求
     * @param url
     * @param options
     * @param dataProcessor
     * @param isFormData
     * @protected
     */
    protected async fetchData(url: string, options: any, dataProcessor: DataProcessor, isFormData:any=null): Promise<any> {
        const request = this.buildRequest(url, options, isFormData);
        let ex;
        try {
            const response = await fetch(request);
            if (response.status < 300) {
                let text = ((await response.text()) || '').trim();
                if (text.length > 0) {
                    let headers = response.headers;
                    let resType = headers.get(CONTENT_TYPE_NAME);
                    let data = resType.includes(TYPE_JSON) ? JSON.parse(text) : text;
                    if (this.postInvoke) {
                        data = await this.postInvoke(data);
                    }
                    data = dataProcessor != null ? dataProcessor(data) : data;
                    RestService.debug && console.debug(TAG, "返回数据：", data);
                    return data;
                } else {
                    return null;
                }
            } else {
                let status = response.status;
                let errObj;
                try {
                    errObj = await response.json();
                    console.debug(TAG, errObj);
                } catch (e) {
                    errObj = {code: 100}
                }
                ex = new ApiError(status, errObj);
            }
        } catch (e1) {
            console.error(TAG, "Failure:", e1);
            ex = new ApiError(-1, {code: 100});
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
        RestService.debug && console.debug(TAG, "发送GET请求到" + url, "参数：", (params || '无'));
        return await this.fetchData(Utils.combineUrl(url, params), Utils.generateRequestOptions('GET'), dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async post(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        RestService.debug && console.debug(TAG, "发送POST请求到" + url, "参数：", (params || '无'), "数据：", (data || '无'));
        return await this.fetchData(Utils.combineUrl(url, params), Utils.generateRequestOptions('POST', data), dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async put(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        RestService.debug && console.debug(TAG, "发送PUT请求到" + url, "参数：", (params || '无'), "数据：", (data || '无'));
        return await this.fetchData(Utils.combineUrl(url, params), Utils.generateRequestOptions('PUT', data), dataProcessor);
    }

    /**
     *
     * @param url
     * @param data
     * @param params
     * @param dataProcessor
     */
    async del(url: string, data: any, params: any = null, dataProcessor: DataProcessor = null): Promise<any> {
        RestService.debug && console.debug(TAG, "发送DELETE请求到" + url, "参数：", (params || '无'), "数据：", (data || '无'));
        return await this.fetchData(Utils.combineUrl(url, params), Utils.generateRequestOptions('DELETE', data), dataProcessor);
    }

    /**
     * 上传单个文件
     * @param url
     * @param params
     * @param file
     * @param dataProcessor
     * @returns {Promise<*|string|null|undefined>}
     */
    async upload(url: string, params: any, file: File, dataProcessor: DataProcessor = null):Promise<any> {
        RestService.debug && console.debug(TAG, "上传文件" + file.name);
        let formData = new FormData();
        formData.append('filename', file);
        let options = {
            method: "POST",
            body: formData,
            headers: new Headers()
        }
        return await this.fetchData(Utils.combineUrl(url, params), options, dataProcessor, true);
    }

    async download(url, params, filename):Promise<any> {
        RestService.debug && console.debug(TAG, "发送GET请求到" + url, "参数：", (params || '无'));
        let options = {method: 'GET'};
        let request = this.buildRequest(Utils.combineUrl(url, params), options, false);
        let response;
        let ex;
        try {
            response = await fetch(request);
            if (response.status < 300) {
                let data = await response.blob();
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(data);
                a.download = filename;
                a.click();
            } else {
                let status = response.status;
                let errObj;
                try {
                    errObj = await response.json();
                    RestService.debug && console.debug(TAG, errObj);
                } catch (e) {
                    errObj = {code: 100}
                }
                ex = new ApiError(status, errObj);
            }
        } catch (e1) {
            console.error(e1);
            ex = new ApiError(-1, {code: 100});
        }
        if (ex != null) {
            if (this.errorHandler != null) {
                this.errorHandler(ex);
            }
            throw ex;
        }
    };

}