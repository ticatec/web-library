import BaseDataManager, {DataConvert} from "./BaseDataManager";
import type {CheckEqual} from "./BaseDataManager";
import type AbstractPaginationDataService from "../DataService/AbstractPaginationDataService";
import CommonPaginationDataManager from "./CommonPaginationDataManager";

export default abstract class PaginationDataManager<T extends AbstractPaginationDataService> extends CommonPaginationDataManager<T> {



    protected constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        super(service, checkEqual, convert);
    }


    protected processDataResult(result: any): void {
        this.list = result.list;
    }

    /**
     * 属性：总页数
     */
    get pageCount(): number {
        return super.getPageCount();
    }

    /**
     * 属性：当前的页码
     */
    get pageNo(): number {
        return super.getPageNo();
    }
}