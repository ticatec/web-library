
/**
 *
 * @param p
 */
const isPromise = (p:any):boolean => {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
}



export default {isPromise};