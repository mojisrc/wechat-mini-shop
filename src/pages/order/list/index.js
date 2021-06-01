import buyServices from '@/services/buy'
import connect from "@/utils/connect";
import storage from "@/services/storage";
import navigation from "@/utils/navigation";
import orderServices from "@/services/order"
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from "@/utils/toast"

Page(connect()({
    data: {
        service: orderServices.list,
        tabs: [
            {
                id: '',
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
        state_type: '',
    },
    listView: null,
    onLoad({ state_type = 'all' }) {
        this.listView = this.selectComponent(`#list`)
        this.setData({
            state_type
        })
        this.listView.onRefresh()
    },
    onListLoad(e) {
        wx.stopPullDownRefresh()
        const { result } = e.detail
        if (e.detail.code === 0) {
            this.setData({
                list: result.list,
            })
        }
    },
    onPullDownRefresh() {
        this.listView.onRefresh()
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    onDetail(e) {
        navigation.navigate('order/detail', {
            id: e.detail.orderId
        })
    },
    onTabChange(e) {
        const { name } = e.detail
        this.listView.setExtraParams(name ? { state_type: name } : {})
        this.listView.onRefresh()
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
                    callback: () => this.updateListRow(orderInfo.id)
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
                    this.updateListRow(orderInfo.id)
                } else {
                    Toast.info(result.msg)
                }
            })
            .catch(() => {
                // on cancel
            });
    },
    async onPay(e) {
        const userInfo = storage.getUserInfo()
        const { orderInfo } = e.detail
        // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
        const payResult = await buyServices.pay({
            'order_type': 'goods_buy',
            'pay_sn': orderInfo.pay_sn,
            'payment_code': 'wechat',
            'payment_channel': 'wechat_mini',
            'openid': userInfo.wechat_open.mini_openid
        })
        if (payResult.code === 0) {
            const { result: { content } } = payResult
            console.warn(content)
            wx.requestPayment({
                'timeStamp': content.timeStamp,
                'nonceStr': content.nonceStr,
                'package': content.package,
                'signType': content.signType,
                'paySign': content.paySign,
                'success': () => {
                    this.listView.onRefresh()
                },
            })
        } else {
            Toast.info(`支付失败：${payResult.msg}`)
        }
    },
}))
