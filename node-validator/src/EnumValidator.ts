import BaseValidator from "./BaseValidator";
import {EnumValidateRule} from "./ValidatorRule";
import {IllegalParameterError} from "@ticatec/express-exception";
import {sprintf} from "sprintf-js";
import Context from "./ValidationContext";

export default class EnumValidator extends BaseValidator{

    protected checkField(rule: EnumValidateRule, value: any, idx?: number): void {
        if (rule.values.indexOf(value) == -1) {
            throw new IllegalParameterError(sprintf(Context.message.INVALID_ENUM, rule.field));
        }
    }
}