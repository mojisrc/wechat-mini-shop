import goodsEvaluateServices from '@/services/goodsEvaluate'
import navigation from "@/utils/navigation";
import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        page: 1,
        rows: 10,
        order_id: 0,
        state: 'un_evaluate',
        tabs: [
            {
                id: 'un_evaluate',
                title: '待评价'
            },
            {
                id: 'is_evaluate',
                title: '已评价'
            }
        ],
        service: goodsEvaluateServices.mine,
        list: [],
    },
    async onLoad({ order_id = 0, evaluate_state = 'un_evaluate' }) {
        if (order_id > 0) {
            this.setData({
                order_id,
                state:evaluate_state
            })
        }
        this.listView = this.selectComponent(`#list`)
        this.onPullDownRefresh()
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
        console.warn(this.data.state)
        this.listView.setExtraParams({evaluate_state:this.data.state})
        this.listView.onRefresh()
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    onTabChange(e) {
        const { name } = e.detail
        this.listView.setExtraParams(name ? { evaluate_state: name } : {})
        this.listView.onRefresh()
    },
    onGoods(e) {
        navigation.navigate('goods/detail',{
            id: e.detail.goodsId
        })
    },
    onDetail(e) {
        navigation.navigate('evaluate/detail',{
            order_goods_id: e.detail.orderGoodsId
        })
    },
    onAdd(e) {
        navigation.navigate('evaluate/add',{
            order_goods_id: e.detail.orderGoodsId
        })
    },
    onAdditional(e) {
        navigation.navigate('evaluate/additional',{
            order_goods_id: e.detail.orderGoodsId
        })
    },
    // 更新某条
    async updateListRow(id) {
        let { list } = this.data
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await goodsEvaluateServices.mine(requestParam)
            if (result.code===0) {
                if (result.list.length === 0) {
                    list = list.splice(listIndex, 1)
                } else {
                    list[listIndex] = result.list[0]
                }
                this.setData({ list })
            }
        }
    },
}))
