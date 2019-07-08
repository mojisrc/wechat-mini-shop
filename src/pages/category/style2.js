import GoodsCategoryModel from "@/models/goodsCategory";
import "regenerator-runtime/runtime"
import fa from "@/utils/fa";

const goodsCategoryModel = new GoodsCategoryModel()
Page({
    data: {
        style: 2,
        categoryList: null,
        categoryId: null,
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.init()
    },
    async init(){
        const categoryListResult = await goodsCategoryModel.list()
        const categoryList = categoryListResult.list

        this.setData({
            categoryList: categoryList
        })
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    categoryClick(e){
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
    }
})
