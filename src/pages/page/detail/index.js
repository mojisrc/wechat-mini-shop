import connect from "@/utils/connect";
import validate from "@/utils/validate";
import Share from "@/utils/share";
import Toast from "@/utils/toast";

Page(connect(({ user, loading }) => ({
    login: user.login,
    userInfo: user.self,
    pageBodyLoading: loading.effects["page/detail"],
}))({
    data: {
        title: "",
        body: [],
        backgroundColor: '#f8f8f8',
        info: null
    },
    onLoad(options) {
        Toast.loading()
        this.options = !validate.isEmpty(options) ? options : { id: 42 }
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
    onPageScroll(){
    },
    initPage() {
        const { dispatch, options: { id } } = this
        dispatch({
            type: 'page/info',
            payload: { id },
            callback: (e) => {
                wx.stopPullDownRefresh()
                Toast.loading(false)
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
    onShareAppMessage: function () {
        const { info } = this.data
        const { id, title, share_title, share_img } = info || {}
        return Share.share({
            title: share_title ? share_title : title,
            path: `/pages/page/detail/index?id=${id}`,
            imageUrl: share_img ? share_img : null
        })
    }
}))
