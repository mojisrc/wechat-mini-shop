import goodsEvaluateServices from '@/services/goodsEvaluate'
import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        order_goods_id: null,
        evaluate: null,
        additional_interval_day: 0
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
        const res = await goodsEvaluateServices.info({ order_goods_id })
        const { info, additional_time, create_time } = res.result
        this.setData({
            evaluate: info,
            additional_interval_day: additional_time ? parseInt((additional_time - create_time) / 86400) : 0

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
}))
