import {CustomCheck} from "./Validator";

export default interface ValidationRule {
    /**
     *
     */
    field: string;
    /**
     *
     */
    name: string;
    /**
     *
     */
    key: string;
    /**
     *
     */
    required?: boolean;
    /**
     *
     */
    custom?: CustomCheck;
}

export interface DateValidatorRule extends ValidationRule {
    min?: Date | string;
    max?: Date | string;
}

export interface IntValidatorRule extends ValidationRule {
    min?: number;
    max?: number;
}

export interface FloatValidatorRule extends ValidationRule {
    min?: number;
    max?: number;
}

export interface StringValidator extends ValidationRule {
    minLength?: number;
    maxLength?: number;
    regex?: string | RegExp;
    format?: string;
}