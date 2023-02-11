/**
 * 自定义校验函数
 */
export type ValidatorFun = (value: any, obj: any) => boolean;

export type ConvertFun = (value) => any;

/**
 * 格式校验
 */
export interface FormatCheck {
    /**
     *
     */
    regex: string;
    /**
     *
     */
    message: string;
}

/**
 * 校验规则
 */
export interface ValidatorRule {
    /**
     * 字段的名字
     */
    field: string;
    /**
     * 类型
     */
    type: string;
    /**
     * 是否是非空
     */
    required?: boolean;
    /**
     * 自定义的校验函数
     */
    validator?: ValidatorFun;
    /**
     *
     */
    isArray?: boolean;

    /**
     *
     */
    convert?: ConvertFun;
}

/**
 * 字符串校验
 */
export interface StringValidateRule extends ValidatorRule {
    /**
     * 最短长度
     */
    minLen?: number;
    /**
     * 最大长度
     */
    maxLen?: number;
    /**
     * 格式校验
     */
    format?: FormatCheck;
}

/**
 * 枚举类型检验
 */
export interface EnumValidateRule extends ValidatorRule {
    /**
     * 值域
     */
    values: Array<any>;
    /**
     * 是否是数字型
     */
    isNumber: boolean;
}

/**
 * 数字类型校验
 */
export interface NumberValidateRule extends ValidatorRule {
    /**
     *
     */
    min?: number;
    /**
     *
     */
    max?: number;
}

/**
 * 对象校验
 */
export interface ObjectValidateRule extends ValidatorRule {
    /**
     *
     */
    rules: Array<ValidatorRule>;
}

/**
 * 日期类型校验
 */
export interface DateValidatorRule extends ValidatorRule {
    /**
     *
     */
    min?: Date;
    /**
     *
     */
    max?: Date;
}

