import BaseValidator from "./BaseValidator";
import {DateValidatorRule} from "./ValidatorRule";
import dayjs from "dayjs";
import {IllegalParameterError} from "@ticatec/express-exception";
import Context from "./ValidationContext";

export default class DateValidator extends BaseValidator {

    protected convertValue(value: any): any {
        return (value instanceof Date) ? value : dayjs(value).toDate();
    }

    protected checkField(rule: DateValidatorRule, value: any, idx?: number): void {
        if (!(value instanceof Date)) {
            throw new IllegalParameterError(this.getErrorMessage(Context.message.INVALID_DATE, rule.field));
        }
        if (rule.min != null) {
            let minDate = dayjs(rule.min);
            if (minDate.isAfter(value)) {
                throw new IllegalParameterError(this.getErrorMessage(Context.message.DATE_SHORTAGE, rule.field));
            }
        }
        if (rule.max != null) {
            let maxDate = dayjs(rule.max);
            if (maxDate.isBefore(value)) {
                throw new IllegalParameterError(this.getErrorMessage(Context.message.DATE_EXCEED, rule.field));
            }
        }
    }

}