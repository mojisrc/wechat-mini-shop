import GoodsModel from "../../models/goods";
import GoodsCategoryModel from "../../models/goodsCategory";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import fa from "../../utils/fa";

const goodsModel = new GoodsModel()
const goodsCategoryModel = new GoodsCategoryModel()
Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
        style: 3,
        categoryList: null,
        smallImageWidth: 0,
        categoryId: null,
        categoryClickIndex: -1
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.init()
    },
    async init(){
        const systemInfo = wx.getSystemInfoSync()
        const categoryListResult = await goodsCategoryModel.list()
        const categoryList = categoryListResult.list
        this.setData({
            smallImageWidth: (systemInfo.windowWidth - 18) / 2,
            categoryList: categoryList,
        })
        this.getList()
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        let requestParam = { page, rows }
        if (this.data.categoryId > 0) {
            requestParam['category_ids'] =[parseInt(this.data.categoryId)]
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    categoryClick(e) {
        this.setData({
            page: 1,
            categoryId: e.currentTarget.dataset.categoryId,
            categoryClickIndex: parseInt(e.currentTarget.dataset.index)
        })
        this.getList()
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
})
