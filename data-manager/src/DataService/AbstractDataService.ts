import BaseDataService from "./BaseDataService";

export default abstract class AbstractDataService extends BaseDataService {

    /**
     * 保存数据
     * @param data
     * @param isNew
     */
    abstract save(data: any, isNew: boolean): Promise<any>;

}
