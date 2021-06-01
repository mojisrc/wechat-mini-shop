import orderServices from '@/services/order'
import navigation from "@/utils/navigation";
import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        goodsInfo: null,
    },
    async onLoad(options) {
        const goodsInfoResult = await orderServices.goodsInfo({
            id: typeof options['order_goods_id'] !== 'undefined' ? options['order_goods_id'] : 414
        })
        this.setData({
            goodsInfo: goodsInfoResult.result.info,
        })
    },
    onClick(e) {
        navigation.navigate('refund/serviceApply',{
            order_goods_id:this.data.goodsInfo.id,
            delta:2,
            refund_type:e.currentTarget.dataset.refundType
        })
    }
}))
