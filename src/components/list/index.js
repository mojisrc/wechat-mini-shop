import ListView from "@/utils/listView";

Component({
    properties: {
        service: {
            type: Function,
            value: null
        },
        noMore: {
            type: Boolean,
            value: false
        },
        noMoreDesc: {
            type: String,
            value: '没有更多了'
        },
        showNoMore: {
            type: Boolean,
            value: true
        },
        showEmpty: {
            type: Boolean,
            value: true
        },
        emptyDesc: {
            type: String,
            value: '暂无相关数据'
        },
        showSkeleton: {
            type: Boolean,
            value: true
        },
    },
    data: {
        firstLoad: true,
        loadMore: false,
        noMore: false,
        list: [],
    },
    lifetimes: {
        attached() {
            this.listView = new ListView({
                service: this.data.service,
                callback: (e) => {
                    this.setData({
                        noMore: this.listView.noMore
                    })
                    this.onLoad(e)
                }
            })
        },
    },
    methods: {
        onLoad(e) {
            this.setData({
                loadMore: false,
                firstLoad: false,
                list: e.result.list
            }, () => {
                this.triggerEvent('load', e)
            })
        },
        onRefresh() {
            this.setData({
                loadMore: false,
                noMore: false
            }, () => {
                this.listView.onRefresh()
            })
        },
        onReachBottom() {
            if (!this.data.noMore) {
                this.setData({
                    loadMore: true
                }, () => {
                    this.listView.onReachBottom()
                })
            }
        },
        setExtraParams(e) {
            this.listView.setExtraParams(e)
        }
    },
});

