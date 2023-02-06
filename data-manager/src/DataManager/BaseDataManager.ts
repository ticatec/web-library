
import type AbstractDataService from "../DataService/AbstractDataService";

export type CheckEqual = (e1: any, e2: any) => boolean;
export type DataConvert = (item: any, isNew: boolean) => any

export default abstract class BaseDataManager<T extends AbstractDataService> {

    private _list: Array<any>;
    private readonly _service: T;
    readonly #checkEqual: CheckEqual;
    readonly #convert: DataConvert;

    /**
     *
     * @param service
     * @param checkEqual
     * @param convert
     */
    protected constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        this._service = service;
        this.#checkEqual = checkEqual;
        this.#convert = convert;
    }

    /**
     *
     * @protected
     */
    protected get checkEqual():CheckEqual {
        return this.#checkEqual;
    }

    async save(data: any, isNew: boolean): Promise<void> {
        let item = await this.service.save(data, isNew);
        if (this.#convert != null) {
            item = this.#convert(item, isNew);
        }
        if (isNew) {
            this._list = [item, ...this._list];
        } else {
            this._list.replace(item, this.#checkEqual);
        }
    }

    /**
     * 从列表中删除数据
     * @param item
     * @protected
     */
    protected removeItem(item):void {
        this._list.remove(item);
    }

    /**
     * 设置数据集
     * @param value
     * @protected
     */
    protected set list(value: Array<any>) {
        this._list = value;
    }

    /**
     * 属性：当前的数据集
     */
    get list(): any {
        return [...this._list];
    }

    protected get service(): T {
        return this._service;
    }

}

