import refundServices from '@/services/refund'
import connect from "@/utils/connect";
import navigation from "@/utils/navigation";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        service: refundServices.list,
        list: [],
    },
    onLoad() {
        this.listView = this.selectComponent(`#list`)
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
    onDetail(e) {
        navigation.navigate('refund/detail', {
            id: e.detail.refundInfo.id
        })
    },
}))
