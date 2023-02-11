import BaseDataManager, {DataConvert} from "./BaseDataManager";
import type {CheckEqual} from "./BaseDataManager";
import type AbstractPaginationDataService from "../DataService/AbstractPaginationDataService";

export default abstract class CommonPaginationDataManager<T extends AbstractPaginationDataService> extends BaseDataManager<T> {

    private static rowsCount: number = 25;

    #criteria: any;
    #pageCount: number = 1;
    #pageNo: number = 1;

    protected constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        super(service, checkEqual, convert);
        this.#criteria = this.buildCriteria();
    }

    static setRowsPerPage(value: number):void {
        CommonPaginationDataManager.rowsCount = value;
    }


    /**
     * 根据条件查询数据
     * @param criteria
     * @param pageNo
     */
    protected async searchData(criteria: any, pageNo: number = 1): Promise<void> {
        if (pageNo < 0) {
            pageNo = 1;
        } else if (pageNo > this.#pageCount) {
            pageNo = this.#pageCount;
        }
        if (pageNo != this.#pageNo) {
            this.#pageNo = pageNo;
        }
        criteria.page = pageNo;
        criteria.rows = CommonPaginationDataManager.rowsCount;
        let result = await this.service.search(criteria.purge());
        this.processDataResult(result);
        this.#pageCount = Math.floor((result.count -1) / criteria.rows) + 1;
        this.#pageNo = pageNo;
        this.#criteria = criteria.clone();
    }

    protected abstract processDataResult(result: any): void;

    /**
     * 设置新的显示页
     * @param value
     */
    async setPageNo(value: number): Promise<void> {
        await this.searchData(this.#criteria, value);
    }

    /**
     * 初始化数据管理器
     */
    async initialize(): Promise<void> {
        const criteria = this.buildCriteria();
        this.list = [];
        await this.searchData(criteria);
    }

    /**
     * 重置条件查询
     */
    async resetSearch(): Promise<void> {
        await this.initialize();
    }

    /**
     * 按照条件重新查询
     * @param criteria
     */
    async search(criteria:any): Promise<void> {
        await this.searchData(criteria);
    }

    /**
     * 刷新查询数据
     */
    async refresh(): Promise<void> {
        this.list = [];
        await this.searchData(this.#criteria);
    }

    protected abstract buildCriteria(): any;

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
     * 属性：总页数
     */
    getPageCount(): number {
        return this.#pageCount;
    }

}