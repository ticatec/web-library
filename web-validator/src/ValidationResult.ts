export default interface ValidationResult {
    /**
     *
     */
    valid: boolean;

    /**
     * 错误信息，示例数据：
     * {
     *     code: '编码不能为空',
     *     name: '名称至少5个字符'
     * }
     */
    errors: any;
}