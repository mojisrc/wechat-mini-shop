import fa from '../../../utils/fa'
import OrderModel from '../../../models/order'
import BuyModel from '../../../models/buy'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const Dialog = require('../../../ui/dialog/dialog');
const orderModel = new OrderModel()
const buyModel = new BuyModel()
Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        orderStateTabs: [
            {
                id: 'all',
                title: '全部'
            },
            {
                id: 'state_new',
                title: '待付款'
            },
            {
                id: 'state_pay',
                title: '待发货'
            },
            {
                id: 'state_send',
                title: '待收货'
            },
            {
                id: 'state_success',
                title: '已完成'
            }
        ],
        list: [],
        state_type: 'all',
    },
    async onLoad({ state_type = 'all' }) {
        this.setData({
            state_type
        })
    },
    onShow() {
        this.setData({
            page: 1
        })
        this.getList()
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        let requestParam = { page, rows }
        if (this.data.state_type !== 'all') {
            requestParam['state_type'] = this.data.state_type
        }
        const result = await orderModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    goDetail(e) {
        wx.navigateTo({
            url: '/pages/order/detail/index?id=' + e.detail.orderId
        })
    },
    onTabChange(e) {
        this.setData({
            state_type: e.detail,
            page: 1,
            list: []
        })
        this.getList()
    },
    async onCancel(e) {
        const orderInfo = e.detail.orderInfo
        const result = await orderModel.cancel({
            'id': orderInfo.id,
        })
        if (result) {
            this.getList()
        } else {
            fa.toast.show({
                title: fa.code.parse(orderModel.getException().getCode())
            })
        }
    },
    onEvaluate(e) {
        const orderInfo = e.detail.orderInfo
        wx.navigateTo({
            url: '/pages/evaluate/list/index?order_id=' + orderInfo.id
        })
    },
    async onReceive(e) {
        Dialog({
            message: '您确认收货吗？状态修改后不能变更',
            selector: '#fa-dialog-receive',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                // 按钮文案
                text: '确认',
                // 按钮文字颜色
                color: 'red',
                // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const orderInfo = e.detail.orderInfo
                const result = await orderModel.confirmReceipt({
                    'id': orderInfo.id,
                })
                if (result) {
                    this.updateListRow(orderInfo.id)
                } else {
                    fa.toast.show({
                        title: fa.code.parse(orderModel.getException().getCode())
                    })
                }
            }
        })
    },
    async onPay(e) {
        const userInfo = fa.cache.get('user_info')
        const orderInfo = e.detail.orderInfo
        const self = this
        // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
        const payResult = await buyModel.pay({
            'order_type': 'goods_buy',
            'pay_sn': orderInfo.pay_sn,
            'payment_code': 'wechat',
            'payment_channel': 'wechat_mini',
            'openid': userInfo.wechat_mini_openid
        })
        if (payResult) {
            wx.requestPayment({
                'timeStamp': payResult.timeStamp,
                'nonceStr': payResult.nonceStr,
                'package': payResult.package,
                'signType': payResult.signType,
                'paySign': payResult.paySign,
                'success': function () {
                    self.setData({
                        page: 1
                    })
                    this.updateListRow(orderInfo.id)
                },
                'fail': function (res) {
                    fa.toast.show({
                        title: res
                    })
                }
            })
        } else {
            fa.toast.show({
                title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
            })
        }
    },
    // 更新某条
    async updateListRow(id) {
        let { list } = this.data
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await orderModel.list(requestParam)
            if (result) {
                if (result.list.length === 0) {
                    list = list.splice(listIndex, 1)
                } else {
                    list[listIndex] = result.list[0]
                }
                this.setData({ list })
            }
        }
    },
    async onLogistics(e){
        const result = await orderModel.logistics({
            id: e.detail.orderId
        })
        if (result) {
            // 跳转
            // const url = encodeURIComponent("https://m.kuaidi100.com/index_all.html?type=emsguoji&postid=BE960265852US");
            const url = encodeURIComponent(result.info.url)
            wx.navigateTo({
                url: `/pages/webView/index?url=${url}`
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(orderModel.getException().getCode())
            })
        }
    }
})
