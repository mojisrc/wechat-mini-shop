Page({
    data: {
        orderId: null,
        paySn: null,
        payAmount: null,
        showBottomPopup: true,

    },
    onLoad: function ({ order_id, pay_sn, pay_amount }) {
        this.setData({
            orderId: order_id,
            paySn: pay_sn,
            payAmount: pay_amount
        })
    },
    goPortal() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    goDetail() {
        wx.redirectTo({
            url: '/pages/order/detail/index?id=' + this.data.orderId
        })
    }
})