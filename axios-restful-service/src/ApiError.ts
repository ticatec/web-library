export default class ApiError extends Error {

    private _code;
    private _details;
    private _status;

    get code() {
        return this._code;
    }

    get details() {
        return this._details;
    }

    get status() {
        return this._status;
    }

    constructor (status, err) {
        super(err.code);
        this.name = this.constructor.name;
        this._code = err.code;
        this._status = status;
        this._details = err;
    }
}
