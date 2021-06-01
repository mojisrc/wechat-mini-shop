import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import navigation from "@/utils/navigation";

Page(connect(({ user, loading }) => ({
    login: user.login,
    userInfo: user.self,
    logoutLoading: loading.effects['user/logout']
}))({
    data: {
        isBindPhone: false,
        avatar: "",
        nickname: ''
    },
    onShow() {
        const { userInfo } = this.data
        const { phone } = userInfo || {}
        const isBindPhone = !!(phone && phone.length)
        this.setData({
            isBindPhone
        })
    },
    onUploadSuccess(e) {
        this.setData({
            avatar: e.detail.path,
        })
        this.dispatch({
            type: 'user/editProfile',
            payload: {
                avatar: e.detail.path
            },
            callback: (e) => {
                if (e.code !== 0) {
                    Toast.info(e.msg)
                }
            }
        })
    },
    onNicknameChange(e) {
        this.dispatch({
            type: 'user/editProfile',
            payload: {
                nickname:e.detail,
            },
            callback: (e) => {
                if (e.code !== 0) {
                    Toast.info(e.msg)
                }
            }
        })
    },
    logout() {
        const { logoutLoading, login } = this.data
        if (!login || logoutLoading) return
        this.dispatch({
            type: 'user/logout',
            callback: (e) => {
                if (e.code === 0) {
                    wx.switchTab({
                        url: '/pages/user/index'
                    })
                } else {
                    Toast.fail("退出失败")
                }
            }
        })
    },
}))
