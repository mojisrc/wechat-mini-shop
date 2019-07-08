import fa from '@/utils/fa'
import GoodsEvaluate from '@/models/goodsEvaluate'
import "regenerator-runtime/runtime"

const goodsEvaluateModel = new GoodsEvaluate()
Page({
    data: {
        order_goods_id: null,
        evaluate: null
    },
    onLoad({ order_goods_id }) {
        this.setData({
            order_goods_id
        })
    },
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: e.currentTarget.dataset.images
        })
    },
    async onShow() {
        const { order_goods_id } = this.data
        const evaluate = await goodsEvaluateModel.info({
            order_goods_id
        })
        this.setData({
            evaluate
        })
        this.updateListRow()
    },
    updateListRow() {
        const { id } = this.data.evaluate
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
})
