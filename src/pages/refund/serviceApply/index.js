import fa from '@/utils/fa'
import RefundModel from '@/models/refund'
import OrderModel from '@/models/order'
import "regenerator-runtime/runtime"
import { UploadImageInterface } from '@/interface/uploadImage'
import { api } from '@/api'

const refundModel = new RefundModel()
const orderModel = new OrderModel()
Page({
    data: {
        delta: 1,
        noMoreThan: 0,

        refundType: 1,
        reasonList: [],
        receiveStateList: ['未收到货', '已收到货'],
        reason: '',
        userReceive: null,
        refundAmount: '',
        userExplain: '',

        goodsInfo: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderUrl: null,
        uploaderButtonText: '上传凭证(最多6张)',
        uploaderHeader: {},
    },
    async onLoad({ order_goods_id, refund_type, delta = 1 }) {
        // delta 传的话
        const accessToken = fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof  order_goods_id !== 'undefined' ? order_goods_id : 414
        })
        const refundType = parseInt(refund_type) !== 1 ? 2 : 1
        const result = await refundModel.reasonList({
            refund_type: refundType
        })
        const reasonList = result.list.map(function (item) {
            return item.title
        })
        const noMoreThan = parseFloat(goodsInfoResult.info.goods_pay_price) + parseFloat(goodsInfoResult.info.goods_freight_fee)
        this.setData({
            refundType,
            delta: parseInt(delta),
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            },
            refundAmount: noMoreThan,
            noMoreThan,
            goodsInfo: goodsInfoResult.info,
            reasonList
        })
    },
    // todo 失败处理
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.data.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setData({
            uploaderFiles: fa.remove(this.data.uploaderFiles, e.detail.url)
        })
    },
    onRefundAmountChange(e) {
        this.setData({
            refundAmount: parseFloat(isNaN(e.detail.detail.value) || !e.detail.detail.value ? 0 : e.detail.detail.value).toFixed(2)
        })
    },
    onReceiveStateChange(e) {
        this.setData({
            userReceive: parseInt(e.detail.detail.value)
        })
    },
    onResonChange(e) {
        this.setData({
            reason: e.detail.detail.value
        })
    },
    onUserExplainChange(e) {
        this.setData({
            userExplain: e.detail.detail.value
        })
    },
    async onSubmit() {
        if (!this.data.reason) {
            return fa.toast.show({ title: '请选择退款原因' })
        }
        if (!this.data.refundAmount) {
            return fa.toast.show({ title: '请输入退款金额' })
        }
        if (parseFloat(this.data.refundAmount) > this.data.noMoreThan) {
            return fa.toast.show({ title: '退款金额不得超过¥' + this.data.noMoreThan })
        }
        if (!this.data.userExplain) {
            return fa.toast.show({ title: '请填写退款说明' })
        }
        if (!this.data.refundType === 2 && typeof this.data.userReceive !== "number") {
            return fa.toast.show({ title: '请选择货物状态' })
        }
        let data = {
            refund_type: this.data.refundType,
            order_goods_id: this.data.goodsInfo.id,
            reason: this.data.reasonList[this.data.reason],
            refund_amount: this.data.refundAmount,
            user_explain: this.data.userExplain,
        }
        if (this.data.uploaderFiles.length > 0) {
            data['images'] = this.data.uploaderFiles
        }
        if (this.data.refundType === 2) {
            data['user_receive'] = this.data.userReceive + 1
        }
        const result = await refundModel.apply(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(refundModel.getException().getCode())
            })
        } else {
            wx.navigateBack({
                delta: this.data.delta
            })
        }
    }
})
