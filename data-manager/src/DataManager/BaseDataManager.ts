
import type CommonDataService from "../DataService/CommonDataService";

export type CheckEqual = (e1: any, e2: any) => boolean;
export type DataConvert = (item: any, isNew: boolean) => any

export default abstract class BaseDataManager<T extends CommonDataService> {

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

    /**
     * 保存一条记录到数据库，并加入到本地集合
     * @param data
     * @param isNew
     */
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
     * 删除一条记录，并从本地集合中删除
     * @param item
     */
    async remove(item:any):Promise<void> {
        await this.service.remove(item);
        this._list.remove(item);
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
     * 在列表增加一个条目到最前面
     * @param item
     * @protected
     */
    protected append(item: any):void {
        this._list = [item, ...this._list];
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

