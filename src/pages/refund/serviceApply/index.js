import refundServices from '@/services/refund'
import orderServices from '@/services/order'
import { api } from '@/api'
import storage from "@/services/storage";
import connect from "@/utils/connect";
import Toast from "@/utils/toast"

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        delta: 1,
        noMoreThan: 0,
        refundAmount: 0,

        refundType: 1,
        reasonList: [],
        receiveStateList: ['未收到货', '已收到货'],

        goodsInfo: null,
        uploader: {
            url: api.upload.addImage.url,
            name: 'image',
            formData: {
                type: 'file'
            },
        },
    },
    async onLoad({ order_goods_id, refund_type, delta = 1 }) {
        // delta 传的话
        const accessToken = storage.getUserToken()
        const goodsInfoResult = await orderServices.goodsInfo({
            id: typeof order_goods_id !== 'undefined' ? order_goods_id : 414
        })
        const refundType = parseInt(refund_type) !== 1 ? 2 : 1
        const res = await refundServices.reasonList({
            refund_type: refundType
        })
        const reasonList = res.result.list.map(function (item) {
            return item.title
        })
        const noMoreThan = parseFloat(goodsInfoResult.info.goods_pay_price) + parseFloat(goodsInfoResult.info.goods_freight_fee)
        this.setData({
            refundType,
            delta: parseInt(delta),
            refundAmount: noMoreThan,
            noMoreThan,
            goodsInfo: goodsInfoResult.info,
            reasonList,
            uploader: {
                ...this.data.uploader,
                header: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Token': accessToken.access_token
                }
            }
        })
    },

    async onSubmit(e) {
        const { value } = e.detail
        const { refundType, noMoreThan, goodsInfo, reasonList } = this.data
        const user_receive = parseInt(value.user_receive)

        if (refundType === 2 && (user_receive !== 0 || user_receive !== 1)) {
            return Toast.info('请选择货物状态')
        }
        if (value.reason !== null) {
            return Toast.info('请选择退款原因')
        }
        if (!value.refund_amount) {
            return Toast.info('请输入退款金额')
        }
        if (parseFloat(value.refund_amount) > noMoreThan) {
            return Toast.info('退款金额不得超过¥' + noMoreThan)
        }
        if (!value.user_explain) {
            return Toast.info('请填写退款说明')
        }

        let data = {
            ...value,
            refund_type: refundType,
            order_goods_id: goodsInfo.id,
            reason: reasonList[parseInt(value.reason)],
        }
        if (refundType === 2) {
            data['user_receive'] = user_receive + 1
        }
        const res = await refundServices.apply(data)
        if (res.code !== 0) {
            return Toast.info(`${res.msg}`)
        } else {
            wx.navigateBack({
                delta: this.data.delta
            })
        }
    }
}))
