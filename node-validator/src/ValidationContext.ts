const Context = {
    message: {
        REQUIRED: `%1$s:不能为空`,
        INVALID_STRING: `%1$s:不是一个有效的字符串`,
        INVALID_BOOLEAN: '%1$s:不是一个有效的布尔值',
        INVALID_NUMBER: `%1$s:不是一个有效的数字`,
        INVALID_DATE: `%1$s:不是一个有效的日期值`,
        INVALID_ENUM: `%1$s:不是一个有效的枚举数值`,
        DATE_SHORTAGE: '%1$s:早于规定的日期值',
        DATE_EXCEED: '%1$s:超过规定的日期值',
        STRING_LENGTH_EXCEED: `%1$s:长度超过了%2$d个字符`,
        STRING_LENGTH_SHORTAGE: `%1$s:长度至少%2$d个字符`,
        NUMBER_EXCEED: `%1$s:超过了最大值%2$d`,
        NUMBER_SHORTAGE: `%1$s:不能低于最低数值%2$d`,
        INVALID_ARRAY_ITEM: '元素%1$d包含无效数据:%2$s',
        INVALID_OBJECT: '%1$s包含错误：%2$s',
        INVALID_ARRAY: '%1$s是一个无效的数组'
    }
}

export default Context;