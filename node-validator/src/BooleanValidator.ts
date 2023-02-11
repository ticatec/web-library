import BaseValidator from "./BaseValidator";
import {ValidatorRule} from "./ValidatorRule";
import {IllegalParameterError} from "@ticatec/express-exception";
import Context from "./ValidationContext";

export default class BooleanValidator extends BaseValidator {

    protected convertValue(value: any): any {
        const t = typeof value;
        if (t == "number") {
            return value != 0;
        } else if (t == 'string') {
            value = value.toUpperCase();
            return value == 'T' || value == 'TRUE';
        }
        return value;
    }

    protected checkField(rule: ValidatorRule, value: any, idx?: number): void {
        if (typeof value != 'boolean') {
            throw new IllegalParameterError(this.getErrorMessage(Context.message.INVALID_DATE, rule.field));
        }
    }

}