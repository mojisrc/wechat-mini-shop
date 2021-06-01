import PaymentMethod from "@/utils/paymentMethod";

Component({
    data: {
        visible: false,
        type: 0,
        payBtnText: '支付',
        miniOpenid: "",
        orderPaySn: "",
        userBalance: 0,
        payAmount: 0,
        orderType: "",
        onSuccess: () => {
        },
        onFail: () => {
        },
        onClose: () => {
        }
    },
    methods: {
        PaymentMethod: new PaymentMethod(),
        onAssetsRechargePay() {
            const dispatch = getApp()._store.dispatch
            const { orderPaySn, orderType } = this.data
            const payload = {
                order_type: orderType,
                pay_sn: orderPaySn,
                payment_code: 'balance',
                payment_channel: 'balance',
            }
            dispatch({
                type: 'buy/pay',
                payload,
                callback: async (e) => {
                    if (e.code === 0) {
                        this.data.onSuccess()
                    } else {
                        this.data.onFail(res)
                    }
                }
            })
        },
        onWechatPay() {
            const dispatch = getApp()._store.dispatch
            const { orderPaySn, orderType, type, miniOpenid } = this.data
            dispatch({
                type: 'buy/pay',
                payload: {
                    'order_type': orderType,
                    'pay_sn': orderPaySn,
                    'payment_code': 'wechat',
                    'payment_channel': 'wechat_mini',
                    'openid': miniOpenid,
                    is_balance: type === 1 ? 1 : 0
                },
                callback: (payResponse) => {
                    if (payResponse.code === 0) {
                        const payResult = payResponse.result.content
                        wx.requestPayment({
                            'timeStamp': payResult.timeStamp,
                            'nonceStr': payResult.nonceStr,
                            'package': payResult.package,
                            'signType': payResult.signType,
                            'paySign': payResult.paySign,
                            'success': () => {
                                this.data.onSuccess()
                            },
                            'fail': (res) => {
                                this.data.onFail(res)
                            }
                        })
                    } else {
                        this.triggerEvent('fail', payResponse.msg);
                    }
                }
            })
        },
        onTypePress(e) {
            const type = parseInt(e.currentTarget.dataset.index)
            this.setData({
                type,
                payBtnText: this.getPayBtnText(type)
            })
        },
        onPay() {
            const { type, userBalance, payAmount } = this.data
            if (type === 1 && userBalance > payAmount) {
                this.onAssetsRechargePay()
            } else {
                this.onWechatPay()
            }
        },
        getPayBtnText(type) {
            const { userBalance, payAmount } = this.data
            if (type === 0) {
                return `微信支付 ¥${payAmount}`
            } else {
                if (payAmount > userBalance) {
                    // https://blog.csdn.net/weixin_42286528/article/details/89883616 解决js parseFloat bug  parseFloat(0.7)-parseFloat(0.3)
                    const openPayAmount = ((payAmount * 10000) - (userBalance * 10000)) / 10000
                    return `微信支付 ¥${openPayAmount} 余额支付 ¥${userBalance}`
                } else {
                    return `余额支付 ¥${payAmount}`
                }
            }
        },
        _close() {
            this.setData({
                visible: false
            }, () => {
                this.data.onClose()
            })
        },
        close() {
            this.setData({
                visible: false
            })
        },
        show(e) {
            this.setData({
                visible: true,
                ...e
            }, () => {
                if (!e['userBalance']) {
                    this.onWechatPay()
                }
                this.setData({
                    payBtnText: this.getPayBtnText(0)
                })
            })
        },
    },
})
