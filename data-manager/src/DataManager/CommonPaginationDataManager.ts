import BaseDataManager, {DataConvert} from "./BaseDataManager";
import type {CheckEqual} from "./BaseDataManager";
import type CommonPaginationDataService from "../DataService/CommonPaginationDataService";
import {utils} from "@ticatec/enhanced-utils";

export default abstract class CommonPaginationDataManager<T extends CommonPaginationDataService> extends BaseDataManager<T> {

    private static rowsCount: number = 25;

    #criteria: any;
    #pageCount: number = 1;
    #pageNo: number = 1;
    #count: number = 0;
    #rows: number; //
    #options: any;

    /**
     *
     * @param service
     * @param checkEqual
     * @param options
     * @protected
     */
    protected constructor(service:T, checkEqual: CheckEqual, options?: any, rows?: number, convert?: DataConvert) {
        super(service, checkEqual, convert);
        this.list = [];
        this.#rows = rows??CommonPaginationDataManager.rowsCount;
        this.#options = options;
        this.#criteria = service.buildCriteria(options);
    }

    static setRowsPerPage(value: number):void {
        CommonPaginationDataManager.rowsCount = value;
    }

    /**
     * 删除一条记录，并从本地集合中删除
     * @param item
     */
    async remove(item:any):Promise<void> {
        await super.remove(item);
        if (this.list.length < CommonPaginationDataManager.rowsCount / 2) {
            await this.refresh();
        }
    }

    /**
     * 根据条件查询数据
     * @param criteria
     * @param pageNo
     */
    protected async searchData(criteria: any, pageNo: number = 1): Promise<void> {
        if (pageNo <= 0) {
            pageNo = 1;
        } else if (pageNo > this.#pageCount) {
            pageNo = this.#pageCount;
        }
        if (pageNo != this.#pageNo) {
            this.#pageNo = pageNo;
        }
        criteria.page = pageNo;
        criteria.rows = this.#rows;
        let result = await this.service.search(criteria);
        this.processDataResult(result);
        this.#pageCount = Math.floor((result.count -1) / criteria.rows) + 1;
        this.#pageNo = pageNo;
        this.#count = result.count;
        this.#criteria = utils.clone(criteria);
    }

    protected abstract processDataResult(result: any): void;

    /**
     * 设置新的显示页
     * @param value
     */
    async setPageNo(value: number): Promise<void> {
        await this.searchData(this.#criteria, value);
    }

    async setRowsPage(value: number): Promise<void> {
        let times = value / this.#rows;
        this.#rows = value;
        this.#pageNo = Math.floor(((this.#pageNo||1) - 1) / times) + 1;
        await this.searchData(this.#criteria, this.#pageNo);
    }

    /**
     * 初始化数据管理器
     */
    async initialize(): Promise<void> {
        await this.refresh();
    }

    /**
     * 重置条件查询
     */
    async resetSearch(): Promise<void> {
        this.list = [];
        await this.searchData(this.service.buildCriteria(this.#options));
    }

    /**
     * 按照条件重新查询
     * @param criteria
     */
    async search(criteria): Promise<void> {
        await this.searchData(criteria);
    }

    /**
     * 设置查询条件
     * @param criteria
     */
    async setCriteria(criteria): Promise<void> {
        await this.searchData(criteria);
    }

    /**
     * 刷新查询数据
     */
    async refresh(): Promise<void> {
        this.list = [];
        await this.searchData(this.#criteria);
    }

    /**
     * 当前的查询条件
     */
    get criteria(): any {
        return this.#criteria;
    }


    protected getPageNo():number {
        return this.#pageNo;
    }

    /**
     * 总页数
     */
    protected getPageCount(): number {
        return this.#pageCount;
    }

    /**
     * 返回纪录总数
     * @protected
     */
    get count(): number {
        return this.#count;
    }



}