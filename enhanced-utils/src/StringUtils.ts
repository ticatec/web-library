/**
 * 判断是否是字符串
 * @param s
 */
const isString = (s: any) => typeof s == 'string';

/**
 * 判断是否是空字符串，会删除前后多余的空格
 * @param value
 * @param strict 是否严格要求，两端的空格会被忽略
 */
const isEmpty = (value: any, strict: boolean = true): boolean => {
    if (value == null || value == undefined) {
        return true;
    }

    if (typeof value !== 'string') {
        return false;
    }

    const trimmedValue = strict ? value.trim() : value;

    return trimmedValue.length === 0;
};

/**
 * 专一字符串中的html标识符
 * @param text
 */
const escapeHtml = (text: string): string => {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text == null ? '' : text.replace(/[&<>"']/g, (m:string) => map[m]);
}

export default {isString, escapeHtml, isEmpty}