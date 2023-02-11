import {ValidatorRule} from "./ValidatorRule";
import {IllegalParameterError} from "@ticatec/express-exception";
import Context from "./ValidationContext";
import {sprintf} from "sprintf-js";

export default abstract class BaseValidator {

    check(rule: ValidatorRule, obj: any): void {
        let attr = obj[rule.field];
        if (attr == null) {
            if (rule.required) {
                throw new IllegalParameterError(sprintf(Context.message.REQUIRED, rule.field));
            }
        } else {
            if (rule.convert != null && typeof rule.convert == "function") {
                attr = rule.convert(attr);
                obj[rule.field] = attr;
            } else {
                attr = this.convertValue(attr);
                obj[rule.field] = attr;
            }
            if (Array.isArray(attr)) {
                if (rule.isArray == true) {
                    attr.forEach((item, idx) => {
                        this.checkField(rule, item, idx);
                    });
                } else {
                    throw new IllegalParameterError(sprintf(Context.message.INVALID_ARRAY, rule.field));
                }
            } else {
                this.checkField(rule, attr);
            }
            if (typeof rule.validator == 'function') {
                rule.validator(attr, obj);
            }
        }
    }

    /**
     *
     * @param value
     * @protected
     */
    protected convertValue(value: any): any {
        return value;
    }

    protected abstract checkField(rule: ValidatorRule, value: any, idx?: number): void;

    protected getErrorMessage(format: string, ...args): string {
        return sprintf(format, args);
    }
}