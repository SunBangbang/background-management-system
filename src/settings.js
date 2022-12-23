module.exports = {
    title: '山东省公共资源交易中心',

    /**
     * @type {boolean} true | false
     * @description 是否显示设置右侧面板
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description 是否需要tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description 是否在侧栏中显示徽标
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description 需要显示错误日志组件。
     * 默认值仅在生产环境中使用
     * 如果您还想在dev中使用它，可以传递['production'，'development']
     */
    errorLog: 'production'
}