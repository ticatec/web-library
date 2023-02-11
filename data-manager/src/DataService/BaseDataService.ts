export default class BaseDataService {
    private static serverProxy;

    static setProxy(value: any) {
        BaseDataService.serverProxy = value;
    }

    protected getService():any {
        return BaseDataService.serverProxy;
    }
}