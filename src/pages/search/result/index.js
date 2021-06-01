import Json from "@/utils/json";
import connect from "@/utils/connect";
import ListView from "@/utils/listView";
import goodsService from "@/services/goods";
import navigation from "@/utils/navigation";
import Toast from "@/utils/toast";

Page(connect(({  }) => ({
}))({
    data: {
        keywords: '',
        categoryId: 1,
        categoryKeywords: '',
        brandIds: [],
        sortType: 0,
        imageWidth: 0,
        filterbarItems: [
            {
                type: 'radio',
                label: '综合',
                value: null,
                children: [
                    {
                        label: '不限',
                        value: null,
                    },
                    {
                        label: '新品优先',
                        value: 7,
                    },
                    {
                        label: '评价数从高到低',
                        value: 11,
                    },
                ],
            },
            {
                type: 'text',
                label: '销量',
                value: null,
            },
            {
                type: 'sort',
                label: '价格',
                value: null,
            },
            {
                type: 'checkbox',
                label: '品牌',
                value: [],
                children: [],
            },
        ],
        listView: null,
        list: [],
        filterbarValues: []
    },
    onLoad({ keywords = '', category_id = '', brand_ids = [] }) {
        this.listView = new ListView({
            service: goodsService.list,
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        list: e.result.list,
                    })
                }
                wx.stopPullDownRefresh()
            },
        })
        const { dispatch } = this
        dispatch({
            type: 'goods/brandList',
            payload: {
                page: 1,
                rows: 100
            },
            callback: (e) => {
                const { filterbarItems } = this.data
                if (e.code === 0) {
                    filterbarItems[3].children = e.result.list.map((item) => {
                        return {
                            label: item.title,
                            value: item.id,
                        }
                    })
                    this.setData({ filterbarItems })
                }
            }
        })
        if (category_id > 0) {
            dispatch({
                type: 'goodsCategory/info',
                payload: {
                    id: category_id
                },
                callback: (e) => {
                    if (e.code === 0) {
                        this.setData({ categoryInfo: e.result.info })
                    } else {
                        Toast.fail(e.msg)
                    }
                }
            })
        }
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            keywords,
            categoryId: category_id,
            imageWidth: (systemInfo.windowWidth - 18) / 2,
            category_ids: category_id > 0 ? [category_id] : [],
            brand_ids: Json.isJSON(brand_ids) ? JSON.parse(brand_ids) : [],
        }, () => {
            this.onPullDownRefresh()
        })
    },
    onPullDownRefresh() {
        const { keywords, categoryId, brandIds, sortType } = this.data
        let extraParams = {}
        if (keywords) {
            extraParams['keywords'] = keywords
        }
        if (categoryId > 0) {
            extraParams['category_ids'] = [categoryId]
        }
        if (brandIds.length > 0) {
            extraParams['brand_ids'] = brandIds
        }
        if (sortType > 0) {
            extraParams['sort_type'] = sortType
        }
        this.listView.setExtraParams(extraParams)
        this.listView.onRefresh()
    },
    onSearchConfirm(e) {
        this.setData({
            keywords: e.detail.keywords,
        }, () => {
            this.onPullDownRefresh()
        })
    },
    onFilterbarChange(e) {
        const { filterbarValues } = this.data
        let _filterbarItems = e.detail.items
        const { index } = e.detail
        let sortType = this.data.sortType

        switch (index) {
            case 0:
                sortType = e.detail.values[0]
                _filterbarItems[1].value = null
                _filterbarItems[2].value = null
                break
            case 1:
                sortType = 3
                _filterbarItems[0].value = null
                _filterbarItems[2].value = null
                break
            case 2:
                sortType = e.detail.values[2] === 'up' ? 1 : 2
                _filterbarItems[0].value = null
                _filterbarItems[1].value = null
                break
        }
        this.setData({
            filterbarItems: _filterbarItems,
            filterbarValues: e.detail.values,
            brandIds: e.detail.values[3],
            sortType
        }, () => {
            if (JSON.stringify(filterbarValues) !== JSON.stringify(e.detail.values)) {
                this.onPullDownRefresh()
            }
        })
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    onGoodsDetail(e) {
        navigation.navigate('goods/detail', {
            id: e.currentTarget.dataset.id
        })
    },
}))
