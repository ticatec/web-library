import Dictionary, {DataLoader, GetText} from "./Dictionary";

export type IsLeaf = (item:any) => boolean;

export default class TreeDictionary extends Dictionary {

    #leafs:Array<any>;
    readonly #isLeaf: IsLeaf;

    /**
     *
     * @param loader
     * @param keyName
     * @param getText
     * @param missingText
     * @param isLeaf
     */
    constructor(loader: DataLoader, keyName: string, getText: string | GetText, missingText: string, isLeaf: IsLeaf) {
        super(loader, keyName, getText, missingText);
        this.#isLeaf = isLeaf;
    }

    /**
     * 构造map
     * @param items
     * @protected
     */
    protected buildMap(items: Array<any>):void {
        this.#leafs = [];
        this.buildHierarchicalMap(items);
    }

    /**
     *
     * @param items
     * @protected
     */
    protected buildHierarchicalMap(items: Array<any>):void {
        items.forEach(item => {
            this.map.set(item[this.keyName], item);
            if (this.#isLeaf(item)) {
                this.#leafs.push(item);
            } else if (item.children != null && item.children.length > 0) {
                this.buildHierarchicalMap(item.children);
            }
        });
    }

    /**
     * 得到所有的叶子节点
     */
    get leafs():Array<any> {
        if (!this.initialized) {
            throw new Error('数据字典尚未初始化');
        }
        return [...this.#leafs];
    }

    /**
     * 获取指定节点的子节点
     * @param key
     */
    getChildren(key: string) {
        let item = this.get(key);
        return item == null || item.children == null ? [] : [...item.children];
    }
}