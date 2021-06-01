import navigation from "@/utils/navigation";
import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        orderId: null,
        paySn: null,
        payAmount: null,
        showBottomPopup: true,
    },
    onPageScroll(){
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
    onDetail() {
        navigation.navigate('order/detail',{
            id:this.data.orderId
        })
    }
}))
