import BaseValidator from "./BaseValidator";
import {IllegalParameterError} from "@ticatec/express-exception";
import Context from "./ValidationContext";
import {StringValidateRule} from "./ValidatorRule";
import {sprintf} from "sprintf-js";

export default class StringValidator extends BaseValidator {

    protected checkField(rule: StringValidateRule, value: string, idx?: number):void {
        if (typeof value != 'string') {
            throw new IllegalParameterError(sprintf(Context.message.INVALID_STRING, rule.field));
        }
        if (rule.minLen > 0 && value.length < rule.minLen) {
            throw new IllegalParameterError(sprintf(Context.message.STRING_LENGTH_SHORTAGE, rule.field, rule.minLen));
        }
        if (rule.maxLen > 0 && value.length > rule.maxLen) {
            throw new IllegalParameterError(sprintf(Context.message.STRING_LENGTH_EXCEED, rule.field, rule.maxLen))
        }
        if (rule.format != null && value.match(rule.format.regex) === null) {
            throw new IllegalParameterError(rule.format.message) ;
        }
    }
}
