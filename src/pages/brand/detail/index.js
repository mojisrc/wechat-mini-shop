import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import ListView from "@/utils/listView";
import goodsService from "@/services/goods";
import navigation from "@/utils/navigation";
import validate from "@/utils/validate";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        imageWidth: 0,
        list: [],
        brand: {}
    },
    listView: null,
    options: {},
    onLoad(options) {
        const systemInfo = wx.getSystemInfoSync()
        this.options = !validate.isEmpty(options) ? options : { id: 114 }
        this.listView = new ListView({
            service: goodsService.list,
            extraParams: { brand_ids: [this.options.id] },
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        list: e.result.list,
                        imageWidth: (systemInfo.windowWidth - 18) / 2
                    })
                } else {
                    Toast.fail(e.msg)
                }
            },
        })
        this.initBrand()
        this.onPullDownRefresh()
    },
    onPullDownRefresh() {
        this.listView.onRefresh()
    },
    onReachBottom() {
        this.listView.onReachBottom()
    },
    initBrand() {
        const { dispatch, options: { id } } = this
        dispatch({
            type: 'goods/brandInfo',
            payload: {
                id
            },
            callback: (e) => {
                if (e.code === 0) {
                    this.setData({
                        brand: e.result.info
                    })
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    onGoodsDetail(e) {
        navigation.navigate('goods/detail', {
            id: e.currentTarget.dataset.id
        })
    },
}))
