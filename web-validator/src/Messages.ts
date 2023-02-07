let messages:any = {
    REQUIRED: '请输入%1$s的值',
    INVALID_STRING: '%1$s不是一个有效的字符串',
    INVALID_DATE: '%1$s不是一个有效的日期值',
    INVALID_NUMBER: '%1$s不是一个有效的数字',
    INVALID_INTEGER: '%1$s不是一个有效的整数',
    STRING_TO_SHORT: '%1$s没有达到要求的长度',
    NUMBER_TO_SMALL: '%1$s不能小于%2$f',
    NUMBER_TO_BIG: '%1$s不能超过%2$f',
    REGEXP_NOT_MATCH: '%1$s不是有效的格式',
    DATE_TO_EARLY: '%1$s不能早于规定的开始时间',
    DATE_TO_LATER: '%1$s不能晚于规定的结束时间',
};

const setMessages = (value: any):void => {
    messages = value;
}

const getMessage = (key) => {
    return messages[key] || `${key}没有对应的信息`;
}

export {setMessages, getMessage}