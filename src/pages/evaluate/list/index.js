import GoodsEvaluateModel from '@/models/goodsEvaluate'
import "regenerator-runtime/runtime"

const goodsEvaluateModel = new GoodsEvaluateModel()

Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        order_id: 0,
        evaluate_state: 'un_evaluate',
        stateTabs: [
            {
                id: 'un_evaluate',
                title: '待评价'
            },
            {
                id: 'is_evaluate',
                title: '已评价'
            }
        ],
        list: [],
    },
    async onLoad({ order_id = 0, evaluate_state = 'un_evaluate' }) {
        if (order_id > 0) {
            this.setData({
                order_id,
                evaluate_state
            })
        }
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
        if (this.data.order_id > 0) {
            requestParam['order_id'] = this.data.order_id
        }
        requestParam['evaluate_state'] = this.data.evaluate_state

        const result = await goodsEvaluateModel.mine(requestParam)
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
    onGoods(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.detail.goodsId
        })
    },
    onDetail(e) {
        wx.navigateTo({
            url: '/pages/evaluate/detail/index?order_goods_id=' + e.detail.orderGoodsId
        })
    },
    onAdd(e) {
        wx.navigateTo({
            url: '/pages/evaluate/add/index?order_goods_id=' + e.detail.orderGoodsId
        })
    },
    onAdditional(e) {
        wx.navigateTo({
            url: '/pages/evaluate/additional/index?order_goods_id=' + e.detail.orderGoodsId
        })
    },
    onTabChange(e) {
        this.setData({
            evaluate_state: e.detail,
            page: 1,
            list: []
        })
        this.getList()
    },
    // 更新某条
    async updateListRow(id) {
        let { list } = this.data
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await goodsEvaluateModel.mine(requestParam)
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
