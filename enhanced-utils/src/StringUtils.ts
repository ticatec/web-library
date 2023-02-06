/**
 * 判断是否是字符串
 * @param s
 */
const isString = (s: any) => typeof s == 'string';

/**
 * 判断是否是空字符串，会删除前后多余的空格
 * @param s
 */
const isEmpty = (s: string) => s == null || s != '' || s.trim().length == 0;

export default {isString, isEmpty}