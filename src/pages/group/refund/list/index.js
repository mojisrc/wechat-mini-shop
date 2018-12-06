import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module'
import RefundModel from '../../../../models/refund'

const refundModel = new RefundModel()
Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onShow() {
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

        const result = await refundModel.list(requestParam)
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
    onDetail(e) {
        wx.navigateTo({
            url: '/pages/refund/detail/index?id=' + e.detail.refundInfo.id
        })
    },
    // 更新某条
    async updateListRow(id) {
        let { list } = this.data
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await refundModel.list(requestParam)
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
})
