import fa from '@/utils/fa'
import OrderModel from '@/models/order'
import "regenerator-runtime/runtime"

const orderModel = new OrderModel()
Page({
    data: {
        userInfo: null,
        stateNum: null,
    },
    goOrderList(e) {
        wx.navigateTo({
            url: '/pages/order/list/index?state_type='+e.currentTarget.dataset.stateType
        })
    },
    goAddressList() {
        wx.navigateTo({
            url: '/pages/address/list/index'
        })
    },
    goEvaluateList(){
        wx.navigateTo({
            url: '/pages/evaluate/list/index'
        })
    },
    goUserSetting() {
        wx.navigateTo({
            url: '/pages/user/setting/index'
        })
    },
    goRefundList() {
        wx.navigateTo({
            url: '/pages/refund/list/index'
        })
    },
    onLoad(){
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    onLoginSuccess() {
        this.setData({
            userInfo: fa.cache.get('user_info')
        })
    },
    async onShow() {
        const userInfo = fa.cache.get('user_info')
        this.setData({
            loginState: fa.getLoginState(userInfo),
            userInfo: userInfo
        })
        if(userInfo){
            const stateNum = await orderModel.stateNum()
            this.setData({
                stateNum: stateNum
            })
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
