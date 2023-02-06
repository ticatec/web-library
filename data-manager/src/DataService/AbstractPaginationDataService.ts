import AbstractDataService from "./AbstractDataService";
import PaginationList from "../PaginationList";

export default abstract class AbstractPaginationDataService extends AbstractDataService {

    /**
     * 根据条件分页查询符合条件的数据
     * @param criteria
     */
    abstract search(criteria: any): Promise<PaginationList>;

}