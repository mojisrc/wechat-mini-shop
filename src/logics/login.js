import Inviter from "@/utils/inviter"
import userApi from "@/services/user"
import Toast from "@/utils/toast";
import storage from "@/utils/storage"
import navigation from "@/utils/navigation";

export default class Login {
    options = {
        success: function () {
        },
        error: function () {
        }
    }

    data = {
        access_token: null,
        expires_in: null,
    }

    constructor(options) {
        this.options = Object.assign(this.options, options);
    }

    async userLogin(data) {
        const res = await userApi.login(data)
        if (res.code === 0) {
            this.data.access_token = res.result.access_token
            this.data.expires_in = res.result.expires_in
            return true
        } else {
            return false
        }
    }

    async wechatRegister() {
        let profile = null
        try {
            profile = await wx.getUserProfile({
                desc: '用于完善会员资料'
            })
        } catch (e) {
            // 拒绝
        }
        if (!profile) {
            Toast.loading(false)
            await this.refreshCode() // 刷新code 因为登录的时候用过了
            return
        }
        await this.refreshCode() // 刷新code 因为登录的时候用过了
        const code = storage.get('code')
        const registerRes = await userApi.register({
            register_type: 'wechat_mini',
            wechat_mini_param: {
                code,
                ...profile
            },
        })
        if (registerRes.code === 0) {
            const app = getApp()
            app._store.dispatch({
                type: 'user/userLoginSuccessAfter',
                payload: registerRes.result,
                callback: () => {
                    Inviter.bind();
                    navigation.goBack()
                }
            })
            await this.refreshCode()
        } else {
            Toast.info(registerRes.msg)
        }
    }

    async refreshCode() {
        const login = await wx.login()
        if (login.errMsg === "login:ok") {
            storage.set('code', login.code)
        } else {
            Toast.info(login.errMsg)
        }
    }

    async wechatLogin(autoRegister = true) {
        const userLogin = await this.userLogin({
            login_type: 'wechat_mini',
            wechat_mini_code: storage.get('code')
        })
        if (!userLogin && autoRegister === true) {
            this.clearUserInfo()
            this.wechatRegister()
        } else {
            const app = getApp()
            app._store.dispatch({
                type: 'user/userLoginSuccessAfter',
                payload: {
                    access_token: this.data.access_token,
                    expires_in: this.data.expires_in,
                },
                callback: () => {
                    Inviter.bind();
                    navigation.goBack()
                }
            })
        }
    }

    clearUserInfo() {
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('user_token')
    }
}
