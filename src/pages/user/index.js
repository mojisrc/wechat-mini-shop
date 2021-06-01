import orderServices from '@/services/order'
import connect from "@/utils/connect";
import navigation from "@/utils/navigation";

Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
    assetsInfo: user.assetsInfo
}))({
    data: {
        stateNum: null,
    },
    onPageScroll() {
    },
    onOrderList(e) {
        const { login } = this.data;
        if (login) {
            navigation.navigate('order/list', {
                state_type: e.currentTarget.dataset.stateType
            })
        } else {
            navigation.navigate('user/login')
        }
    },
    onAddressList() {
        const { login } = this.data;
        if (login) {
            navigation.navigate('address/list')
        } else {
            navigation.navigate('user/login')
        }
    },
    onEvaluateList() {
        const { login } = this.data;
        if (login) {
            navigation.navigate('evaluate/list')
        } else {
            navigation.navigate('user/login')
        }
    },
    onUserSetting() {
        const { login } = this.data;
        if (login) {
            navigation.navigate('user/setting')
        } else {
            navigation.navigate('user/login')
        }
    },
    onRefundList() {
        const { login } = this.data;
        if (login) {
            navigation.navigate('refund/list')
        } else {
            navigation.navigate('user/login')
        }
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    onLoginSuccess() {

    },
    async onShow() {
        const { login } = this.data
        const { dispatch } = this
        if (login) {
            dispatch({
                type: 'user/assetsInfo',
                callback: async (e) => {
                    if (e.code === 0) {
                        const stateNum = await orderServices.stateNum()
                        this.setData({
                            stateNum: stateNum,
                        })
                    }
                }
            });
        }
    },
    onAssetsNumPress(e) {
        const { login } = this.data
        const { item } = e.currentTarget.dataset
        if (login) {
            navigation.navigate(item.path, item.params)
        }
    },
    onServicePress(e) {
        const { login } = this.data;
        const url = e.currentTarget.dataset.url
        if (login) {
            switch (url) {
                case 'collect':
                    navigation.navigate('collect/index')
                    break
                case 'address':
                    navigation.navigate('user/address/list')
                    break
                case 'footprint':
                    navigation.navigate('user/footprint')
                    break
                case 'customerService':
                    break
            }
        } else {
            if (url !== 'customerService') {
                navigation.navigate('user/login')
            }
        }
    },
    onShareAppMessage: function () {
        const shopInfo = cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
}))
