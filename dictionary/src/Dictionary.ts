import {utils} from "@ticatec/enhanced-utils";

export type DataLoader = () => Promise<Array<any>>;
export type GetText = (item: any) => string;

export default class Dictionary {

    protected readonly loader: any;
    protected readonly keyName: any;
    protected readonly getText: string | GetText;
    protected readonly missingText: string;
    #loading: boolean = false;
    #list: Array<any>;
    #initialized: boolean = false;
    #map: Map<string, any> = new Map<string, any>();

    /**
     * 构造函数
     * @param loader
     * @param keyName
     * @param getText
     * @param missingText
     */
    constructor(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string) {
        this.loader = loader;
        this.keyName = keyName;
        this.getText = getText;
        this.missingText = missingText;
    }

    /**
     * 重新读取数据，增加锁定，防止重复读取数据
     */
    async reload(): Promise<void> {
        if (!this.#loading) {
            console.debug('build the dictionary');
            this.#loading = true;
            try {
                this.#list = await this.loader() //utils.isAsyncFunction(this.loader) ? : this.loader();
                if (!(utils.isArray(this.#list))) {
                    console.warn('data:', this.#list);
                    throw new Error('It is not an array');
                }
                this.#initialized = true;
                this.buildMap(this.#list);
            } finally {
                this.#loading = false;
            }
        } else {
            return new Promise<void>(resolve => {
                const interval = setInterval(()=>{
                    if (!this.#loading) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            })
        }
    }

    /**
     * 构造map
     * @param items
     * @protected
     */
    protected buildMap(items: Array<any>):void {
        this.#map.clear();
        items.forEach(item => {
            this.#map.set(item[this.keyName], item);
        })
    }

    /**
     *
     * @protected
     */
    protected get map(): Map<string, any> {
        return this.#map;
    }

    /**
     * 获取对象列表
     */
    get list():Array<any> {
        return [...this.#list];
    }

    /**
     * 获取list列表
     */
    toList(): Array<any> {
        return this.list;
    }

    /**
     * 根据key获取对应的对象
     * @param key
     */
    get(key: string):any {
        if (!this.#initialized) {
            throw new Error('数据字典尚未初始化');
        }
        return this.#map.get(key);
    }

    /**
     * 根据key获取对应的文字值
     * @param key
     */
    getValue(key: string): string {
        let item = this.get(key);
        if (item == null) {
            return this.missingText;
        } else {
            return typeof this.getText == 'string' ?  item[this.getText] : this.getText(item);
        }
    }


    /**
     * 是否初始化
     */
    get initialized():boolean {
        return this.#initialized;
    }

    /**
     * 使当前的数据字典失效
     */
    invalidate():void {
        this.#initialized = false;
    }
}