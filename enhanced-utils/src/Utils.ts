import stringUtils from "./StringUtils";

/**
 * 判断是否是数组
 * @param data
 */
const isArray = (data: any):boolean => data != null && data instanceof Array;

/**
 * 判断是否一个函数
 * @param fun
 */
const isFunction = (fun: any):boolean => fun != null && typeof fun == 'function';

/**
 * 判断是否是一个异步函数
 * @param fun
 */
const isAsyncFunction = (fun: any):boolean => isFunction(fun) && (fun.constructor.name == 'AsyncFunction');

/**
 * 让程序暂停n秒
 * @param n
 */
const sleep = (n: number): Promise<void> => {
    return n > 0 ? new Promise(resolve => {
        setTimeout(()=>{resolve()}, n*1000);
    }): null;
}

const isObject = (value:any):boolean => {
    return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 深度克隆一个对象
 * @param obj
 */
const clone = (obj: any):any => {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 清理一个对象，删除其中是null，空字符串和空数组
 * @param obj
 * @param strict
 */
const objectPurge = (obj: any, strict: boolean=true): any => {
    let data = {};
    Object.keys(obj).forEach(key =>{
        let v = obj[key];
        let isNull = v == null || (isArray(v) && v.length == 0)
            || (stringUtils.isEmpty(v, strict));
        if (!isNull) {
            data[key] = isObject(v) ? objectPurge(v, strict) : v;
        }
    });
    return data;
}

/**
 * 把src下的属性拷贝添加到dest中
 * @param dest
 * @param src
 * @param props 指定的属性
 */
const objectMerge = (dest: any, src: any, props: Array<string> = null): void => {
    if (src == null) {
        throw new Error(`The source object cannot be null.`)
    }
    if (props == null) {
        props = Object.keys(src);
    }
    props.forEach(key=>{
        if (src[key]==undefined) {
            throw new Error(`The properties ${key} is not found in source object.`)
        }
        dest[key] = src[key]
    });
}

export default {isArray, isFunction, isAsyncFunction, isObject, sleep, clone, objectMerge, objectPurge}