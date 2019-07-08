import OrderModel from '@/models/order'
import "regenerator-runtime/runtime"

const orderModel = new OrderModel()
Page({
    data: {
        goodsInfo: null,
    },
    async onLoad(options) {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof options['order_goods_id'] !== 'undefined' ? options['order_goods_id'] : 414
        })
        this.setData({
            goodsInfo: goodsInfoResult.info,
        })
    },
    onClick(e) {
        wx.navigateTo({
            url: `/pages/refund/serviceApply/index?order_goods_id=${this.data.goodsInfo.id}&delta=2&refund_type=${e.currentTarget.dataset.refundType}`
        })
    }

})
