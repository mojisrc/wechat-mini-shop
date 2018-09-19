import fa from '../../../utils/fa'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import GoodsEvaluateModel from "../../../models/goodsEvaluate";

const goodsEvaluateModel = new GoodsEvaluateModel()

Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: []
    },
    async onLoad({ goods_id }) {
        this.setData({ goods_id:goods_id })
        this.getList()
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        const goods_id = this.data.goods_id
        let requestParam = { page, rows, goods_id }
        const result = await goodsEvaluateModel.list(requestParam)
        console.log(result)
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
    }
})
