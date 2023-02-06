/**
 * 清理属性中的空白属性
 * @param data
 */
const cleanEmptyAttrs = (data: any) : any => {
    let obj = {};
    for (let attr in data) {
        let value = data[attr];
        if (value != null && typeof value == 'string') {
            if (value.trim().length == 0) {
                value = null;
            }
        }
        if (value != null) {
            obj[attr] = value;
        }
    }
    return obj;
}

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

export default {cleanEmptyAttrs, isArray, isFunction, isAsyncFunction, sleep}