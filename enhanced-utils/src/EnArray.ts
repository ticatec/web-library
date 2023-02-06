export type ObjectEqual = (e1: any, e2: any) => boolean;

declare global {
    interface Array<T> {
        /**
         * 从数组中删除匹配的元素，如果删除成功返回true，如果没有发现符合条件的，返回false
         * @param elem
         */
        remove(elem: T): boolean;

        /**
         * 替换数组中匹配的元素
         * @param elem
         * @param match
         */
        replace(elem: T, match: ObjectEqual): boolean;

        /**
         * 把目标数组合并到当前的数组中，并去除旧的匹配的元素
         * @param list
         * @param match
         */
        union(list: Array<T>, match: ObjectEqual): void;
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function<T>(this: T[], elem: T): boolean {
        let idx = this.indexOf(elem);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        } else {
            return false;
        }
    }
}

if (!Array.prototype.replace) {
    Array.prototype.replace = function<T>(this: T[], elem: T, match: ObjectEqual): boolean {
        let idx = this.findIndex(el=>match(el, elem));
        if (idx > -1) {
            this[idx] = elem;
            return true;
        } else {
            return false;
        }
    }
}

if (!Array.prototype.union) {
    Array.prototype.union = function<T>(this: T[], list:T[], match: ObjectEqual): void {
        list.forEach(item=>{
            let idx = this.findIndex(el=>match(el, item));
            if (idx > -1) {
                this[idx] = item;
            } else {
                this.push(item);
            }
        })
    }
}

