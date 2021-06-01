import Url from "@/utils/url";
import Toast from "@/utils/toast";

var pageScroll = require('@/behaviors/pageScroll')

Component({
    behaviors: [pageScroll.pageScroll(function (event) {
        this.onScroll(event);
    })],
    properties: {
        login: {
            type: Boolean,
            value: false
        },
        payload: {
            type: Object,
            value: null
        },
        userInfo: {
            type: Object,
            value: null
        },
        navHeight: {
            type: Number,
            value: 0
        }
    },
    data: {
        body: [],
        backgroundColor: '#f8f8f8',
        defaultTabIndex: 0,
        // 高亮的线
        itemBottomWidth: 0,
        itemBottomLeft: 0,
        tabHeight: 0,
        fixed: false,
    },
    observers: {
        'payload': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                const { options: { default_tab_index } } = newVal || {}
                this.setData({
                    defaultTabIndex: parseInt(default_tab_index)
                }, () => {
                    this.getItemWidth()
                })
            }
        }
    },
    methods: {
        getDefaultRequestParams() {
            const { payload: { options: { tabs, default_tab_index } } } = this.data || {}
            let pageId = tabs[default_tab_index]['pageId'];
            return {
                id: pageId,
            }
        },
        onPullDownRefresh() {
            const { payload: { options: { default_tab_index } } } = this.data || {}
            this.setData({
                defaultTabIndex: parseInt(default_tab_index)
            }, () => {
                this.initPage()
            })
        },
        getRequestParams(forceRefresh = false) {
            let defaultRequestParams = this.getDefaultRequestParams()
            if (forceRefresh !== true) {
            }
            return Url.filterUndefined(defaultRequestParams)
        },
        async request  ()  {
            return null
        },
        async onReachBottom() {
            try {
                const selectComponent = this.selectComponent(`#page`)
                if (selectComponent) {
                    if (typeof selectComponent['onReachBottom'] === "function") {
                        selectComponent.onReachBottom();
                    }
                }
            } catch (e) {
                console.warn(e)
            }
        },
        initPage() {
            const { payload: { options: { tabs } }, defaultTabIndex } = this.data || {}
            let pageId = tabs[defaultTabIndex]['pageId'];
            const app = getApp()
            app._store.dispatch({
                type: 'page/info',
                payload: { id: pageId },
                callback: (e) => {
                    Toast.loading(false)
                    if (e.code === 0) {
                        const { info } = e.result
                        this.setData({
                            body: info.body,
                            backgroundColor: info.background_color,
                        })
                    }
                }
            })
        },
        onPress(e) {
            const { index } = e.currentTarget.dataset
            const { defaultTabIndex } = this.data
            let _index = parseInt(index)

            if (_index !== defaultTabIndex) {
                this.setData({
                    defaultTabIndex: _index
                }, () => {
                    this.getItemWidth()
                    this.initPage()
                })
            }
        },
        getItemWidth() {
            const { defaultTabIndex } = this.data
            this.createSelectorQuery().select(`#text${defaultTabIndex}`).boundingClientRect((res) => {
                const { width, left } = res || {}
                this.setData({
                    itemBottomWidth: width,
                    itemBottomLeft: left
                })
            }).exec();
        },
        onScroll: function (event) {
            wx.nextTick(() => {
                this.createSelectorQuery().select('#main').boundingClientRect((rect) => {
                    const { top } = rect
                    if (this.data.tabHeight === 0) {
                        this.setData({ tabHeight: rect.height })
                    }
                    const { fixed, navHeight } = this.data
                    const over = navHeight >= top
                    if (over && fixed === false) {
                        this.setData({ fixed: true })
                    } else if (!over && fixed === true) {
                        this.setData({ fixed: false })
                    }
                }).exec()
            })
        }
    },
});
