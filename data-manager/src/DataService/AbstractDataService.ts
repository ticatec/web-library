
export default abstract class AbstractDataService {

    private static serverProxy;

    static setProxy(value: any) {
        AbstractDataService.serverProxy = value;
    }

    protected getService():any {
        return AbstractDataService.serverProxy;
    }

    /**
     * 保存数据
     * @param data
     * @param isNew
     */
    abstract save(data: any, isNew: boolean): Promise<any>;

}
