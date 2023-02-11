import BaseValidator from "./BaseValidator";
import {NumberValidateRule} from "./ValidatorRule";
import {IllegalParameterError} from "@ticatec/express-exception";
import {sprintf} from "sprintf-js";
import Context from "./ValidationContext";

export default class NumberValidator extends BaseValidator{

    protected convertValue(value: any): any {
        return typeof value == 'string' ? parseFloat(value) : value;
    }

    protected checkField(rule: NumberValidateRule, value: any, idx?: number): void {
        if (typeof value != 'number') {
            throw new IllegalParameterError(sprintf(Context.message.INVALID_NUMBER, rule.field));
        }
        if (rule.min != null && value < rule.min) {
            throw new IllegalParameterError(sprintf(Context.message.NUMBER_SHORTAGE, rule.field, rule.min));
        }
        if (rule.max != null && value > rule.max) {
            throw new IllegalParameterError(sprintf(Context.message.NUMBER_EXCEED, rule.field, rule.max));
        }
    }
}