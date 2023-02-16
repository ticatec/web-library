import CommonDataService from "./CommonDataService";
import PaginationList from "../PaginationList";

export default abstract class CommonPaginationDataService extends CommonDataService {

    /**
     * 根据条件分页查询符合条件的数据
     * @param criteria
     */
    search(criteria: any): Promise<PaginationList> {
        console.log('发送的查询条件：', criteria, criteria.purge(), (criteria || {}).purge());
        criteria = (criteria || {}).purge();
        return this.getService().get(this.url, criteria) ;
    }

    abstract buildCriteria(): any;
}