import GoodsCategoryModel from "../../models/goodsCategory";
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import fa from "../../utils/fa";

const goodsCategoryModel = new GoodsCategoryModel()
Page({
    data: {
        style: 1,
        categoryList: null,
        mainNavClickIndex: 0,
        mainNavScrollIndex: 0,
        mainNavScrollPoints: [],
        categoryId: null,
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.init()
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    async init(){
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
            categoryList: categoryList,
            mainNavScrollPoints: mainNavScrollPoints,
        })
    },
    mainNavTap: function (e) {
        this.setData({
            mainNavClickIndex: e.currentTarget.dataset.index
        })
    },
    subNavScroll: function (e) {
        const mainNavScrollPoints = this.data.mainNavScrollPoints
        for (let i = 0; 0 <= (mainNavScrollPoints.length - 1); i++) {
            // console.log(`当前位置是：${e.detail.scrollTop}，${mainNavScrollPoints[i].start}---${mainNavScrollPoints[i].end}`)
            if (mainNavScrollPoints[i].start <= e.detail.scrollTop && e.detail.scrollTop < mainNavScrollPoints[i].end) {
                this.setData({
                    mainNavScrollIndex: mainNavScrollPoints[i].index
                })
                break;
            }
        }
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
    }
})
