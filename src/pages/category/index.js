import GoodsCategoryModel from "../../models/goodsCategory";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import fa from "../../utils/fa";
import ShopModel from '../../models/shop'
import GoodsModel from "../../models/goods";

const shopModel = new ShopModel()
const goodsCategoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()
// todo 需要重构 如果模板多就不好管理了，初期对微信小程序的理解不够 架构的坑
Page({
    data: {
        style: 1,
        style1: {
            categoryList: null,
            mainNavClickIndex: 0,
            mainNavScrollIndex: 0,
            mainNavScrollPoints: [],
            categoryId: null,
        },
        style2: {
            categoryList: null,
            categoryId: null,
        },
        style3: {
            page: 1,
            rows: 10,
            noMore: false,
            list: [],
            style: 3,
            categoryList: null,
            smallImageWidth: 0,
            categoryId: null,
            categoryClickIndex: -1
        }
    },
    async onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            this.setData({
                style: result.info.goods_category_style + 1
            })
            fa.cache.set('shop_info', result)
            this.init()
        }
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    async init() {
        switch (this.data.style) {
            case 1:
                const categoryListResult = await goodsCategoryModel.list()
                const categoryList = categoryListResult.list

                let mainNavScrollPoints = []
                // 算出主菜单位置
                for (let i = 0; i < categoryList.length; i++) {
                    mainNavScrollPoints.push({
                        index: i,
                        start: 103 * i * parseInt(categoryList[i].childs.length / 3),
                        end: 103 * (i + 1) * parseInt(categoryList[i].childs.length / 3)
                    })
                }

                this.setData({
                    style1: {
                        ...this.data.style1, ...{
                            categoryList: categoryList,
                            mainNavScrollPoints: mainNavScrollPoints,
                        }
                    }
                })
                break
            case 2:
                const categoryListResult2 = await goodsCategoryModel.list()
                const categoryList2 = categoryListResult2.list
                this.setData({
                    style2: {
                        ...this.data.style2, ...{
                            categoryList: categoryList2,
                        }
                    }
                })
                break
            case 3:
                const systemInfo = wx.getSystemInfoSync()
                const categoryListResult3 = await goodsCategoryModel.list()
                const categoryList3 = categoryListResult3.list
                this.setData({
                    style3: {
                        ...this.data.style3, ...{
                            smallImageWidth: (systemInfo.windowWidth - 18) / 2,
                            categoryList: categoryList3,
                        }
                    }
                })
                this.style3GetGoodsList()
                break
        }

    },
    mainNavTap: function (e) {
        this.setData({
            style1: {
                ...this.data.style1, ...{
                    mainNavClickIndex: e.currentTarget.dataset.index
                }
            }
        })
    },
    subNavScroll: function (e) {
        const mainNavScrollPoints = this.data.style1.mainNavScrollPoints
        for (let i = 0; 0 <= (mainNavScrollPoints.length - 1); i++) {
            // console.log(`当前位置是：${e.detail.scrollTop}，${mainNavScrollPoints[i].start}---${mainNavScrollPoints[i].end}`)
            if (mainNavScrollPoints[i].start <= e.detail.scrollTop && e.detail.scrollTop < mainNavScrollPoints[i].end) {
                this.setData({
                    style1: {
                        ...this.data.style1, ...{
                            mainNavScrollIndex: mainNavScrollPoints[i].index
                        }
                    }
                })
                break;
            }
        }
    },
    async onReachBottom() {
        switch (this.data.style) {
            case 3:
                if (this.data.style3.noMore === true) {
                    return false
                } else {
                    this.style3GetGoodsList()
                }
                break
        }
    },
    async style3GetGoodsList() {
        const { style3 } = this.data
        const page = style3.page
        if (page > 1 && style3.noMore === true) {
            return
        }
        const rows = style3.rows
        const list = page === 1 ? [] : style3.list
        let requestParam = { page, rows }
        if (style3.categoryId > 0) {
            requestParam['category_ids'] = [parseInt(style3.categoryId)]
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData({
                style3: {
                    ...this.data.style3, ...data
                }
            })
        }
    },
    style3CategoryClick(e) {
        this.setData({
            style3: {
                ...this.data.style3, ...{
                    page: 1,
                    categoryId: e.currentTarget.dataset.categoryId,
                    categoryClickIndex: parseInt(e.currentTarget.dataset.index)
                }
            }
        })
        this.style3GetGoodsList()
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    categoryClick(e) {
        wx.navigateTo({
            url: `/pages/goods/search/index?category_id=${e.currentTarget.dataset.categoryId}&category_keywords=${e.currentTarget.dataset.categoryName}`
        })
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    },
})
