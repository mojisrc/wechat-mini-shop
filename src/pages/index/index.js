import connect from "@/utils/connect";
import navigation from "@/utils/navigation";
import Share from "@/utils/share";
import Toast from "@/utils/toast";

Page(connect(({ user, loading }) => ({
    login: user.login,
    pageBodyLoading: loading.effects["page/detail"],
}))({
    data: {
        title: "",
        body: [],
        backgroundColor: '#f8f8f8',
        info: null
    },
    onLoad() {
        Toast.loading()
        wx.showShareMenu({ withShareTicket: true })
        this.onPullDownRefresh()
    },
    onPullDownRefresh() {
        this.initPage()
    },
    onReachBottom() {
        try {
            const selectComponent = this.selectComponent(`#page`)
            if (selectComponent) {
                if (typeof selectComponent['onReachBottom'] === "function") {
                    selectComponent.onReachBottom();
                }
            }
        } catch (e) {
            console.warn(e)
        }
    },
    onPageScroll() {
    },
    initPage() {
        const { dispatch } = this
        dispatch({
            type: 'page/portal',
            callback: (e) => {
                Toast.loading(false)
                wx.stopPullDownRefresh()
                if (e.code === 0) {
                    const { info } = e.result
                    this.setData({
                        title: info.name,
                        body: info.body,
                        backgroundColor: info.background_color,
                        info
                    }, () => {
                        wx.setNavigationBarTitle({
                            title: info.name
                        })
                    })
                }
            }
        })
    },
    onSearchClick() {
        navigation.navigate("search/result")
    },
    onShareAppMessage: function () {
        const { info } = this.data || {}
        const { share_title, title, share_img } = info || {}
        return Share.share({
            title: share_title ? share_title : title,
            path: `/pages/index/index`,
            imageUrl: share_img ? share_img : null
        })
    },
}))
