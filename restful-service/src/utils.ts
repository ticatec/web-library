const toQueryString = (obj)=> {
    let list = [];
    Object.keys(obj).forEach(key=>{
       if (obj[key]!=null && obj[key]!=='') {
           list.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
       }
    });
    return list.length === 0 ? null : list.join('&');
}

const combineUrl = (url, params) => {
    let qs = params == null ? null : toQueryString(params);
    return qs == null ? url :`${url}?${qs}`;
}

const generateRequestOptions = (method: string, data: any = null) => {
    let headers:Headers = new Headers();
    let options = {
        method: method,
        headers: headers,
        body: null
    };
    if (data != null) {
        options.body = JSON.stringify(data);
    }
    return options;
}

const isFunction = (fun) => {
    return fun != null && fun instanceof Function;
}

const invokeFunction = (fun, ...args) => {
    if (isFunction(fun)) {
        fun(...args);
    }
}

export default {
    toQueryString, combineUrl, generateRequestOptions, isFunction, invokeFunction
}