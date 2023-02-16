import BaseDataService from "./BaseDataService";

export default class CommonDataService extends BaseDataService {

    protected readonly url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    /**
     * 保存数据
     * @param data
     * @param isNew
     */
    save(data: any, isNew: boolean): Promise<any> {
        if (isNew) {
            return this.getService().post(this.url, data);
        } else {
            return this.getService().put(this.url, data);
        }
    }

}
