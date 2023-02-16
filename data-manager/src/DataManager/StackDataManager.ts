import BaseDataManager, {CheckEqual, DataConvert} from "./BaseDataManager";
import CommonPaginationDataService from "../DataService/CommonPaginationDataService";
import CommonPaginationDataManager from "./CommonPaginationDataManager";

export default abstract class StackDataManager<T extends CommonPaginationDataService> extends CommonPaginationDataManager<T> {



    #total: number;
    #hasMore: boolean;

    protected constructor(service:T, checkEqual: CheckEqual, convert?: DataConvert) {
        super(service, checkEqual, convert);
    }


    protected processDataResult(result: any) {
        this.list.union(result.list, this.checkEqual);
    }

    /**
     * 加载新的一页数据
     */
    async loadMore(): Promise<void> {
        if (this.getPageNo() < this.getPageCount()) {
            await this.setPageNo(this.getPageNo() + 1);
        }
    }

    /**
     * 是否有更多的记录
     */
    hasMore(): boolean {
        return this.getPageNo() < this.getPageCount();
    }


}