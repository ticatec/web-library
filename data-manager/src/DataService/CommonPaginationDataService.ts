import CommonDataService from "./CommonDataService";
import PaginationList from "../PaginationList";
import {utils} from "@ticatec/enhanced-utils";

export default abstract class CommonPaginationDataService extends CommonDataService {

    /**
     * 根据条件分页查询符合条件的数据
     * @param criteria
     */
    search(criteria: any): Promise<PaginationList> {
        return this.getService().get(this.url, utils.objectPurge(criteria)) ;
    }

    abstract buildCriteria(): any;
}