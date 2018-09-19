import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import PageModel from "../../models/page";
const pageModel = new PageModel()
Page({
    data: {
        pageData: null,
        backgroundColor:'#f8f8f8'
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
        this.initPage()
    },
    onBannerClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGridNavBarClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onGoodsClick(e) {
        const dataSource = e.detail.dataSource
        const goods = dataSource.data[e.detail.index]
        const link = {
            action: 'goods',
            param: {
                id: goods.id
            }
        }
        this.handelLink(link)
    },
    onIconNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onTextNavClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onShopWindowClick(e) {
        const dataSource = e.detail.dataSource
        const info = dataSource.data[e.detail.index]
        this.handelLink(info.link)
    },
    onSearchClick() {
        console.log('onSearchClick')
        wx.navigateTo({
            url: `/pages/goods/search/index`
        })
    },
    async initPage() {
        const page = await pageModel.portal()
        this.setData({
            pageData: page.body,
            backgroundColor:page.background_color
        })
        wx.setNavigationBarTitle({
            title: page.name
        })
    },
    async onPullDownRefresh() {
        this.initPage()
        wx.stopPullDownRefresh()
    },
    handelLink(link) {
        console.log(getCurrentPages())
        switch (link.action) {
            case 'portal':
                wx.switchTab({
                    url: '/pages/index/index'
                })
                break
            case 'goods':
                wx.navigateTo({
                    url: `/pages/goods/detail/index?id=${link.param.id}`
                })
                break
            case 'page':
                if(getCurrentPages().length > 1){
                    // 小程序对层级有限制
                    wx.redirectTo({
                        url: `/pages/page/index?id=${link.param.id}`
                    })
                }else{
                    wx.navigateTo({
                        url: `/pages/page/index?id=${link.param.id}`
                    })
                }
                break
        }
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
})
