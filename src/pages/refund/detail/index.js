import fa from '@/utils/fa'
import RefundModel from '@/models/refund'
import "regenerator-runtime/runtime"

const Dialog = require('@/ui/dialog/dialog');

const refundModel = new RefundModel()

Page({
    data: {
        id: null,
        refundInfo: null,
    },
    async onLoad({ id  }) {
        this.setData({
            id
        })
    },
    async onShow() {
        this.init()
    },
    async init() {
        const refundInfo = await refundModel.info({ id: this.data.id })
        if (refundInfo) {
            console.log(refundInfo)
            this.setData({
                refundInfo,
            })
        }
    },
    onGoods(){
        wx.navigateTo({
            url: `/pages/goods/detail/index?id=${this.data.refundInfo.goods_id}`
        })
    },
    onTrack() {
        wx.navigateTo({
            url: `/pages/refund/logisticsFill/index?id=${this.data.id}&order_goods_id=${this.data.refundInfo.order_goods_id}`
        })
    },
    async onUndo() {
        Dialog({
            title: '撤销申请',
            message: '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？',
            selector: '#fa-dialog-receive',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                text: '确认',
                color: 'red',
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const result = await refundModel.revoke({ id: this.data.id })
                if (result) {
                    this.init()
                } else {
                    fa.cache.toast({
                        title: fa.code.parse(refundModel.getException().getCode())
                    })
                }
            }
        })
    },
    updateListRow() {
        const { id } = this.data
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
})
