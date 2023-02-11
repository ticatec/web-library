import {ValidatorRule} from "./ValidatorRule";
import BaseValidator from "./BaseValidator";
import StringValidator from "./StringValidator";
import EnumValidator from "./EnumValidator";
import NumberValidator from "./NumberValidator";
import ObjectValidator from "./ObjectValidator";
import DateValidator from "./DateValidator";
import BooleanValidator from "./BooleanValidator";

class BeanValidator {

    #map:Map<string, BaseValidator>;

    constructor() {
        this.#map = new Map<string, BaseValidator>();
        this.#map.set('string', new StringValidator());
        this.#map.set('enum', new EnumValidator());
        this.#map.set('number', new NumberValidator());
        this.#map.set('object', new ObjectValidator());
        this.#map.set('date', new DateValidator());
        this.#map.set('boolean', new BooleanValidator());
    }

    validate(rules: Array<ValidatorRule>, obj: any): void {
        this.checkBean(rules, obj);
    }

    checkBean(rules: Array<ValidatorRule>, obj: any): void {
        rules.forEach(rule => {
            let validator: BaseValidator = this.findValidator(rule.type);
            if (validator == null) {
                throw new Error('Unknown validate rule type.')
            }
            validator.check(rule, obj);
        });
    }

    private findValidator(type: string):BaseValidator {
        return this.#map.get(type);
    }
}

const beanValidator = new BeanValidator();

export default beanValidator;