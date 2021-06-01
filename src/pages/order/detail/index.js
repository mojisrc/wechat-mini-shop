import fa from '@/utils/fa'
import buyServices from "@/services/buy";
import connect from "@/utils/connect";
import storage from "@/services/storage";
import navigation from "@/utils/navigation";
import orderServices from "@/services/order"
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from "@/utils/toast"

Page(connect()({
    data: {
        orderInfo: null,
        orderLog: null,
        pageBase: {
            body: []
        }
    },
    onPageScroll() {
    },
    onLoad(options) {
        this.options = options
    },
    onShow() {
        this.init()
    },
    async init() {
        const res = await orderServices.info({ id: this.options.id })
        if (res.code === 0) {
            this.setData({
                orderInfo: res.result.info,
                orderLog: res.result.order_log
            })
        }
        this.initExtraPageInfo()
    },
    onRefund(e) {
        const orderInfo = this.data.orderInfo
        const { goodsInfo } = e.detail
        // 根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
        if (orderInfo.state === 20) {
            // 直接跳转到申请发货
            navigation.navigate('refund/serviceApply', {
                order_goods_id: goodsInfo.id,
                refund_type: 1,
                delta: 1
            })

        } else if (orderInfo.state === 30 || orderInfo.state === 40) {
            // 选择是退款还是退款并退货
            navigation.navigate('refund/serviceType', {
                order_goods_id: goodsInfo.id,
            })
        }
    },
    onRefundDetail(e) {
        const { goodsInfo } = e.detail
        navigation.navigate('refund/detail', {
            id: goodsInfo.refund_id,
        })
    },

    onGoodsDetail(e) {
        const { goodsInfo } = e.detail
        navigation.navigate('goods/detail', {
            id: goodsInfo.goods_id
        })
    },
    onCancel(e) {
        const { dispatch } = this
        Dialog.confirm({
            title: '提示',
            message: '您确认取消吗？状态修改后不能变更',
        })
            .then(() => {
                const { orderInfo } = e.detail
                dispatch({
                    type: "order/cancel",
                    payload: {
                        id: orderInfo.id
                    },
                    callback: () => {
                        this.init()
                    }
                })
            })
            .catch(() => {
                // on cancel
            });
    },
    onEvaluate(e) {
        const { orderInfo } = e.detail
        navigation.navigate('evaluate/list', {
            order_id: orderInfo.id
        })
    },
    async onReceive(e) {
        Dialog.confirm({
            title: '提示',
            message: '您确认收货吗？状态修改后不能变更',
        })
            .then(async () => {
                const { orderInfo } = e.detail
                const result = await orderServices.confirmReceipt({
                    'id': orderInfo.id,
                })
                if (result.code === 0) {
                    this.init()
                } else {
                    fa.toast.show({
                        title: result.msg
                    })
                }
            })
            .catch(() => {
                // on cancel
            });
    },
    async onPay() {
        const userInfo = storage.getUserInfo()
        const { orderInfo } = this.data
        const self = this
        // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
        const res = await buyServices.pay({
            'order_type': 'goods_buy',
            'pay_sn': orderInfo.pay_sn,
            'payment_code': 'wechat',
            'payment_channel': 'wechat_mini',
            'openid': userInfo.wechat_open.mini_openid
        })
        if (res.code === 0) {
            const { result : { content }} = res
            wx.requestPayment({
                'timeStamp': content.timeStamp,
                'nonceStr': content.nonceStr,
                'package': content.package,
                'signType': content.signType,
                'paySign': content.paySign,
                'success': function () {
                    self.init()
                    self.updateListRow()
                },
            })
        } else {
            Toast.info(`支付失败：${res.msg}`)
        }
    },
    onReachBottom() {
        try {
            const selectComponent = this.selectComponent(`#pageBase`)
            if (selectComponent) {
                if (typeof selectComponent['onReachBottom'] === "function") {
                    selectComponent.onReachBottom();
                }
            }
        } catch (e) {
            console.warn(e)
        }
    },
    initExtraPageInfo() {
        const { dispatch } = this
        dispatch({
            type: 'page/extra',
            payload: { sign: 40001 },
            callback: (extra) => {
                if (extra.code === 0) {
                    this.setData({
                        pageBase: {
                            background_color: extra.result.info.background_color,
                            body: extra.result.info.body
                        }
                    })
                }
            }
        })
    },
}))
