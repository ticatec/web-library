/**
 * 判断是否是字符串
 * @param s
 */
const isString = (s: any) => typeof s == 'string';

/**
 * 判断是否是空字符串，会删除前后多余的空格
 * @param s
 * @param strict 是否严格要求，两端的空格会被忽略
 */
const isEmpty = (s: string, strict: boolean = true) => s == null || s == '' || (isString(s) && strict && s.trim().length == 0);

export default {isString, isEmpty}