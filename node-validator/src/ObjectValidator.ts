import BaseValidator from "./BaseValidator";
import {ObjectValidateRule} from "./ValidatorRule";
import beanValidator from "./BeanValidator";

export default class ObjectValidator extends BaseValidator {

    protected checkField(rule: ObjectValidateRule, value: any, idx?: number): void {
        beanValidator.checkBean(rule.rules, value);
    }

}