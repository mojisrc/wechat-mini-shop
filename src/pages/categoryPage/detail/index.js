import connect from "@/utils/connect";
import validate from "@/utils/validate";
import Toast from "@/utils/toast";
import Share from "@/utils/share";

Page(connect(({ loading }) => ({
    pageBodyLoading: loading.effects["categoryPage/detail"],
}))({
    data: {
        info: {}
    },
    onPullDownRefresh() {
        this.initPage()
    },
    onLoad(options) {
        Toast.loading()
        this.options = !validate.isEmpty(options) ? options : { id: 8 }
        this.onPullDownRefresh()
    },
    options: {},
    initPage() {
        const { dispatch } = this
        const { id } = this.options
        dispatch({
            type: 'categoryPage/info',
            payload: {
                id
            },
            callback: (e) => {
                Toast.loading(false)
                wx.stopPullDownRefresh()
                if (e.code === 0) {
                    const { info } = e.result
                    this.setData({
                        info,
                    })
                }
            }
        })
    },
    onShareAppMessage: function () {
        const { info } = this.data
        return Share.share({
            title: info.title,
            path: `/pages/categoryPage/detail/index?id=${info.id}`,
        })
    }
}))
