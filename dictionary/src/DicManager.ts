import Dictionary from "./Dictionary";

class DicManager {


    private map:Map<string, Dictionary> = new Map<string, Dictionary>();

    constructor() {
    }

    /**
     * 注册一个字典
     * @param key
     * @param dic
     */
    register(key: string, dic: Dictionary):void {
        this.map.set(key, dic);
    }

    /**
     * 初始化一组数据字典=
     * @param keys
     */
    async initialize(keys: Array<string>): Promise<void> {
        let err = null;
        for (const key of keys) {
            let dic = this.map.get(key);
            if (dic == null) {
                throw new Error(`数据字典${key}没有注册`);
            }
            if (!dic.initialized) {
                dic.reload().then(()=>{}).catch(e=>{err = e});
            }
        }
        if (!this.checkAllInitialized(keys)) {
            return new Promise<void>((resolve, reject) => {
                let interval = setInterval(async () => {
                    if (err) {
                        clearInterval(interval);
                        reject(err);
                    } else if (this.checkAllInitialized(keys)) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            });
        }
    }

    /**
     * 刷新指定的字典
     * @param key
     */
    async refresh(key: string): Promise<void> {
        const dic = this.map.get(key);
        if (dic != null) {
            await dic.reload();
        }
    }

    /**
     *
     * @param key
     */
    async get(key: string): Promise<Dictionary> {
        const dic = this.map.get(key);
        if (dic != null && !dic.initialized) {
            await dic.reload();
        }
        return dic;
    }

    /**
     * 检查指定的数据字典类是否加载完毕
     * @param keys
     * @private
     */
    private checkAllInitialized(keys: Array<string>):boolean {
        for (const key of keys) {
            let dic = this.map.get(key);
            if (!dic.initialized) {
                return false;
            }
        }
        return true;
    }
}

const dicManager = new DicManager();

export default dicManager;