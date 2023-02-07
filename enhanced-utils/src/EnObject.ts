import stringUtils from "./StringUtils";
import utils from "./Utils";

export {}

declare global {
    interface Object {
        /**
         * 深度克隆一个新对象
         */
        clone(): any;

        /**
         * @param strict 是否是严格的，默认为tru，如果是严格的，会把仅有空格的也都删除掉
         * 返回一个新对象，去掉所有的空属性
         */
        purge(strict: boolean): any;

        /**
         * 从目标对象中复制指定的属性
         * @param from
         * @param props
         */
        merge(from: any, props: Array<string>): void;
    }
}

if (!Object.prototype.clone) {
    Object.prototype.clone = function(): any {
        return JSON.parse(JSON.stringify(this))
    }
}

if (!Object.prototype.purge) {
    Object.prototype.purge = function (strict: boolean = true): any {
        let obj = {};
        Object.keys(this).forEach(key =>{
            let v = this[key];
            if (!(v == null || (utils.isArray(v) && v.length == 0) || (stringUtils.isString(v) && stringUtils.isEmpty(v, strict)))) {
                obj[key] = v;
            }
        });
        return obj;

    }
}

if (!Object.prototype.merge) {
    Object.prototype.merge = function (from: any, props: Array<string>): void {
        if (props == null) {
            props = Object.keys(from);
        }
        props.forEach(key=>{
            this[key] = from[key]
        });
    }
}

