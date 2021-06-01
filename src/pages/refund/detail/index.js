import refundServices from '@/services/refund'
import navigation from "@/utils/navigation";
import connect from "@/utils/connect";
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from "@/utils/toast"

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        id: null,
        refundInfo: null,
    },
    async onLoad({ id }) {
        this.setData({
            id
        })
    },
    async onShow() {
        this.init()
    },
    async init() {
        const res = await refundServices.info({ id: this.data.id })
        this.setData({
            refundInfo: res.result.info,
        })
    },
    onGoods() {
        navigation.navigate('goods/detail', {
            id: this.data.refundInfo.goods_id
        })
    },
    onTrack() {
        navigation.navigate('refund/logisticsFill', {
            id: this.data.id,
            order_goods_id: this.data.refundInfo.order_goods_id
        })
    },
    async onUndo() {
        Dialog.confirm({
            title: '撤销申请',
            message: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？',
        })
            .then(async () => {
                const res = await refundServices.revoke({ id: this.data.id })
                if (res.code === 0) {
                    this.init()
                } else {
                    Toast.info(res.msg)
                }
            })
            .catch(() => {
                // on cancel
            });
    },
}))
