import addressServices from '@/services/address'
import navigation from "@/utils/navigation";
import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        service: addressServices.list,
        list: [],
    },
    onLoad(options) {
        this.listView = this.selectComponent(`#list`)
    },
    onShow() {
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
    onAddressChecked(e) {
        navigation.navigate('address/edit', {
            id: e.detail.addressId
        })
    },
    onEdit(e) {
        navigation.navigate('address/edit', {
            id: e.currentTarget.dataset.id,
        })
    },
    onAdd() {
        navigation.navigate('address/add')
    }
}))
