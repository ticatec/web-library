import dayjs from "dayjs";
import {sprintf} from "sprintf-js";
import type ValidationResult from "./ValidationResult";
import {getMessage} from "./Messages";

export type CustomCheck = (data:any, result: ValidationResult) => boolean;

export default class Validator {

    /**
     * 字段名
     */
    protected readonly field: string;
    /**
     * 名称
     */
    protected readonly name: string;
    /**
     * 是否必须
     */
    protected readonly required?: boolean;
    /**
     * 错误信息的字段名
     */
    protected readonly key: string;

    /**
     * 自己定义的检测方式
     * @protected
     */
    protected readonly custom: CustomCheck;

    constructor(field: string, name: string, key: string, required:boolean = false, custom: CustomCheck = null) {
        this.field = field;
        this.name = name;
        this.key = key || field;
        this.required = required == true;
        this.custom = custom;
    }

    validate(data: any, result: ValidationResult): boolean {
        let valid = this.extractValue(data, result);
        if (valid) {
            let value = data[this.field];
            if (this.isEmpty(value)) {
                if (this.required) {
                    this.setError(result, sprintf(getMessage('REQUIRED'), this.name));
                    valid = false;
                }
            } else {
                console.log('检查属性', this.field, value);
                valid = this.checkValue(value, result);
                if (valid && this.custom != null) {
                    valid = this.custom(data, result);
                }
            }
        }
        return valid;
    }

    /**
     * 从对象中提前数据
     * @param data
     * @param result
     * @protected
     */
    protected extractValue(data: any, result: ValidationResult): any {
        return true;
    }

    /**
     * 是否空
     * @param value
     */
    protected isEmpty(value: any):boolean {
        return value == null;
    }

    /**
     *
     * @param value
     * @param result
     * @protected
     */
    protected checkValue(value: any, result: ValidationResult): boolean {
        return true;
    }

    /**
     *
     * @param result
     * @param error
     * @protected
     */
    protected setError(result: ValidationResult, error: string): void {
        result.valid = false;
        result.errors[this.key] = error;
    }

}

export class StringValidator extends Validator {

    protected readonly minLen: number;
    protected readonly regex: string | RegExp;

    constructor(field: string, name: string, key: string, required:boolean = false, minLen: number,
                regex: string | RegExp, custom: CustomCheck) {
        super(field, name, key, required, custom);
        this.regex = regex;
        this.minLen = minLen;
    }

    protected extractValue(data: any, result: ValidationResult): boolean {
        let value = data[this.field];
        if (value != null) {
            if (typeof value == 'string') {
                value = value.trim();
                data[this.field] = value;
            } else {
                value = value.toString();
            }
        }
        return true;
    }

    protected isEmpty(value: any):boolean {
        return super.isEmpty(value) || value.trim()=='';
    }

    protected checkValue(value: any, result: ValidationResult): boolean {
        if (this.minLen && value.length < this.minLen) {
            this.setError(result, sprintf(getMessage('STRING_TO_SHORT'), this.name));
            return false;
        }
        if (this.regex && value.match(this.regex)==null) {
            this.setError(result, sprintf(getMessage('REGEXP_NOT_MATCH'), this.name));
            return false;
        }
        return true;
    }

}

export class DateValidator extends Validator {

    protected readonly min: Date;
    protected readonly max: Date;

    constructor(field: string, name: string, key: string, required:boolean, min: Date | string,
                max: string | Date, custom: CustomCheck) {
        super(field, name, key, required, custom);
        this.min = min == null ? null : dayjs(min).toDate();
        this.max = max == null ? null : dayjs(max).toDate();
    }

    protected extractValue(data: any, result: ValidationResult): boolean {
        let value = data[this.field];
        if (value != null) {
            if (typeof value == 'string') {
                value = dayjs(value).toDate();
                data[this.field] = value;
            }
            if (!(value instanceof Date)) {
                this.setError(result, sprintf(getMessage('INVALID_DATE'), this.name));
                return false;
            }
        }
        return true;
    }

    protected checkValue(value: any, result: ValidationResult): boolean {
        if (this.min && value < this.min) {
            this.setError(result, sprintf(getMessage('DATE_TO_EARLY'), this.name));
            return false;
        }
        if (this.max && value > this.max) {
            this.setError(result, sprintf(getMessage('DATE_TO_LATER'), this.name));
            return false;
        }
        return true;
    }
}

export class FloatValidator extends Validator {
    protected readonly min: number;
    protected readonly max: number;

    constructor(field: string, name: string, key: string, required:boolean = false, min: number ,
                max: number, custom: CustomCheck) {
        super(field, name, key, required, custom);
        this.min = min == null ? null : min;
        this.max = max == null ? null : max;
    }

    protected extractValue(data: any, result: ValidationResult): boolean {
        let value = data[this.field];
        if (value != null) {
            if (typeof value == 'string') {
                value = parseFloat(value);
            } if (typeof value != 'number') {
                value = NaN;
            }
            if (isNaN(value)) {
                this.setError(result, sprintf(getMessage('INVALID_NUMBER'), this.name));
                return false;
            }
            data[this.field] = value;
        }
        return true;
    }

    protected checkValue(value: number, result: ValidationResult): boolean {
        if (this.min && value < this.min) {
            this.setError(result, sprintf(getMessage('NUMBER_TO_SMALL'), this.name, this.min));
            return false;
        }
        if (this.max && value > this.max) {
            this.setError(result, sprintf(getMessage('NUMBER_TO_BIG'), this.name, this.max));
            return false;
        }
        return true;
    }

}

export class IntValidator extends FloatValidator {

    protected checkValue(value: number, result: ValidationResult): boolean {
        if (value !== Math.floor(value)) {
            this.setError(result, sprintf(getMessage('INVALID_INTEGER'), this.name, this.max));
            return false;
        }
        return super.checkValue(value, result);
    }
}

export class ObjectValidator extends Validator {

    protected validators: Array<Validator>;

    constructor(field: string, name: string, key: string, required:boolean, validators: Array<Validator>,
                custom: CustomCheck) {
        super(field, name, key, required, custom);
        this.validators = validators;
    }

    protected checkValue(value: any, result: ValidationResult): boolean {
        console.log('当前的检测结果', result);
        let valid = true;
        this.validators.forEach(rule=>{
            valid = rule.validate(value, result) && valid;
        });
        return valid;
    }
}