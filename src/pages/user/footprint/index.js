import connect from "@/utils/connect";
import navigation from "@/utils/navigation";
import footprint from "@/services/footprint";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        imageWidth: 0,
        list: [],
        service: footprint.goodsList
    },
    listView: null,
    onLoad() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({ imageWidth: (systemInfo.windowWidth - 18) / 2 })
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
        this.listView.onRefresh()
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    onGoodsDetail(e) {
        navigation.navigate('goods/detail', {
            id: e.currentTarget.dataset.id
        })
    }
}))
