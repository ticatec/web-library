import Validator, {
    DateValidator,
    FloatValidator,
    IntValidator, ObjectValidator,
    StringValidator
} from "./Validator";
import type ValidationResult from "./ValidationResult";

class DataValidator {

    private readonly rules: Array<Validator>;

    constructor(rules: Array<Validator>) {
        this.rules = rules;
    }

    validate(data:any): ValidationResult {
        const result = {valid: true, errors: {}};
        this.rules.forEach(rule=>{
            rule.validate(data, result);
        });
        return result;
    }
}

const createValidationRule = (rule):Validator => {
    switch (rule.type) {
        case 'date':
            return new DateValidator(rule.field, rule.name, rule.key, rule.required, rule.min, rule.max, rule.custom);
        case 'int':
            return new IntValidator(rule.field, rule.name, rule.key, rule.required, rule.min, rule.max, rule.custom);
        case 'float':
            return new FloatValidator(rule.field, rule.name, rule.key, rule.required, rule.min, rule.max, rule.custom);
        case 'object':
            return new ObjectValidator(rule.field, rule.name, rule.key, rule.required, createValidators(rule.rules), rule.custom);
        default:
            return new StringValidator(rule.field, rule.name, rule.key,rule.required, rule.minLen, rule.regex, rule.format, rule.custom,);
    }
}

const createValidators = (rules: Array<Validator>): Array<Validator> => {
    let arr: Array<Validator> = [];
    rules.forEach(rule => {
        arr.push(createValidationRule(rule));
    })
    return arr;
}

export const createDataValidator = (rules: Array<Validator>):DataValidator =>  {
    return new DataValidator(createValidators(rules));
}