import Arr from "@/utils/array"
import Link from "@/utils/link";

const requestType = [
    'goods_guess_like',
    'tab_page',
]
Component({
        properties: {
            body: {
                type: Array,
                value: []
            },
            backgroundColor: {
                type: String,
                value: '#f8f8f8'
            },
            login: {
                type: Boolean,
                value: false
            },
            userInfo: {
                type: Object,
                value: null
            },
            // 是不是子页面 用于tabPage
            subPage: {
                type: Boolean,
                value: false
            },
            navHeight: {
                type: Number,
                value: 0
            }
        },
        observers: {
            // 每次改变数据都会刷新界面，慎用
            'body': function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.setData({
                        pageBody: newVal,
                    }, () => {
                        this.initPageBodyData(newVal)
                    })
                }
            },
        },
        data: {
            pageBody: [],
        },
        methods: {

            /**
             * 初始化每次重置后的数据
             * @param pageBody
             * - 设置不需要渲染的data = []
             * - 设置需要请求的到request.param
             */
            initPageBodyData(pageBody) {
                try {
                    let _body = { ...pageBody }
                    let promiseAll = []
                    pageBody.map((item, index) => {
                        if (Arr.inArray(item.type, requestType)) {
                            const selectComponent = this.selectComponent(`#pageItem${index}`)
                            if (selectComponent && typeof selectComponent['onPullDownRefresh'] === "function" && typeof selectComponent['request'] === "function") {
                                selectComponent.onPullDownRefresh()
                                promiseAll.push(selectComponent.request(true))
                            } else {
                                console.warn(`${item.type}没有onPullDownRefresh`)
                            }
                        } else {
                            _body[index] = item
                            promiseAll.push(null)
                        }
                    })

                    Promise.all(promiseAll).then((values) => {
                        values.map((item, index) => {
                            if (item !== null) {
                                // 避免第一次默认数据格式不全导致报错
                                _body[index]['isRequest'] = true;
                                _body[index].data = values[index]["result"]["list"];
                            }
                        })
                        this.setData({
                            pageBody: Arr.objectToArray(_body)
                        })
                    }).catch(e => {
                        console.warn(e)
                    });
                } catch (e) {
                    console.warn(e)
                }
            },
            onReachBottom() {
                try {
                    const { pageBody } = this.data
                    const { type } = pageBody[pageBody.length - 1]
                    if (
                        Array.isArray(pageBody) &&
                        pageBody.length > 0 && Arr.inArray(type, requestType)
                    ) {
                        const index = pageBody.length - 1
                        const selectComponent = this.selectComponent(`#pageItem${index}`)
                        if (selectComponent) {
                            if (typeof selectComponent['onReachBottom'] === "function") {
                                selectComponent.onReachBottom();
                            } else {
                                console.warn(`${type}没有onReachBottom`)
                            }
                        } else {
                            console.warn(`没有${type}组件`)
                        }
                    }
                } catch (e) {
                    console.warn(e)
                }
            },
            onBannerClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onGridNavBarClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onGoodsClick(e) {
                const payload = e.detail.payload
                const goods = payload.data[e.detail.index]
                const link = {
                    action: 'goods',
                    param: {
                        id: goods.id
                    }
                }
                this.handelLink(link)
            },
            onIconNavClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onTextNavClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onShopWindowClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onAppFloatClick(e) {
                const payload = e.detail.payload
                const info = payload.data[e.detail.index]
                this.handelLink(info.link)
            },
            onSearchClick() {
                wx.navigateTo({
                    url: `/pages/goods/search/index`
                })
            },
            onItemDataChange(e) {
                const { index } = e.currentTarget.dataset
                const { payload } = e.detail
                let body = { ...this.data.pageBody }
                body[index] = payload
                this.setData({
                    pageBody: Arr.objectToArray(body),
                })
            },

            handelLink(link) {
                Link.handel(link)
            }
        }
    }
);

