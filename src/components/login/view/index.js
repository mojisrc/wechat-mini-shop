import fa from "../../../utils/fa";
import LoginLogic from "../../../logics/login";
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {},
    data: {
        userInfo : null,
        scopeUserInfo: false
    },
    ready() {
        const userInfo = fa.cache.get('user_info')
        if(userInfo){
            this.setData({
                userInfo
            })
        }else{
            const self = this
            wx.getSetting({
                success: (res) => {
                    let scopeUserInfo = false
                    if (typeof res.authSetting["scope.userInfo"] === 'undefined') {
                        scopeUserInfo = false
                    } else {
                        scopeUserInfo = res.authSetting["scope.userInfo"]
                    }
                    console.log(scopeUserInfo)
                    self.setData({
                        scopeUserInfo
                    })
                }
            })
        }
    },
    methods: {
        onLogin(e) {
            const self = this
            if (this.data.scopeUserInfo === true || (e.type === 'getuserinfo' && e.detail.errMsg === 'getUserInfo:ok')) {
                const loginLogic = new LoginLogic({
                    success: function (result) {
                        if (result.code === 1) {
                            self.setData({
                                userInfo: fa.cache.get('user_info')
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
        },
    }
});
