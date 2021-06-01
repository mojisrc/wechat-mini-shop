import LoginLogic from "@/logics/login";
import navigation from "@/utils/navigation";

Component({
    externalClasses: ['custom-class'],
    properties: {
        disabled: {
            type: Boolean,
            value: false
        },
        push: {
            type: Boolean,
            value: true
        },
        login: {
            type: Boolean,
            value: false
        },
    },
    data: {
        scopeUserInfo: false,
    },
    ready() {
        const { login } = this.data
        if (!login) {
            const self = this
            wx.getSetting({
                success: (res) => {
                    let scopeUserInfo = false
                    if (typeof res.authSetting["scope.userInfo"] === 'undefined') {
                        scopeUserInfo = false
                    } else {
                        scopeUserInfo = res.authSetting["scope.userInfo"]
                    }
                    self.setData({
                        scopeUserInfo
                    })
                }
            })
        }
    },
    methods: {
        onLogin(e) {
            if (this.data.disabled === true) {
                return false
            }
            const { push } = this.data
            // for 微信政策改变 改造中
            if (push) {
                navigation.navigate('user/login')
            } else {
                wx.showLoading({ title: '授权中' })
                const self = this
                if (this.data.scopeUserInfo === true || (e.type === 'getuserinfo' && e.detail.errMsg === 'getUserInfo:ok')) {
                    const loginLogic = new LoginLogic({
                        success: function (result) {
                            wx.hideLoading()
                            if (result.code === 0) {
                                self.setData({
                                    login: true
                                })
                                self.triggerEvent('success', { result });
                            } else {
                                self.triggerEvent('fail', { result });
                            }
                        }
                    })
                    loginLogic.wechatLogin()
                } else {
                    self.triggerEvent('fail', {
                        result: {}
                    });
                }
            }

        },
    }
});
