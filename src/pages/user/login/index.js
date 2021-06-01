import fa from '@/utils/fa'
import validate from "@/libs/validator"
import connect from "@/utils/connect";
import navigation from "@/utils/navigation"
import Toast from "@/utils/toast";
import { privacyUrl, agreementUrl } from "@/api";
import miniCode from "@/utils/miniCode";
Page(connect(({ user, loading }) => ({
    login: user.login,
    userLoginLoading: loading.effects["user/login"],
}))({
    data: {
        login_type: 'password',
        username: '',
        password: '',
        checked: true
    },
    async onLoad(){
        miniCode.refresh()
    },
    onShow(){
        wx.hideLoading()
        if(this.data.login){
            navigation.goBack()
        }
    },
    onPressPasswordLogin() {
        if (!this.data.checked) {
            Toast.fail("您未同意并阅读用户协议和隐私政策")
            return false
        }
        const { username, password } = this.data
        if (validate.isEmpty(username) === true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
            return
        }
        if (validate.isEmpty(password) === true) {
            fa.toast.show({
                title: fa.code.parse('user_password_require')
            })
            return
        }
        if (validate.isMobilePhone(username, 'zh-CN') !== true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
        }
        const { dispatch } = this
        dispatch({
            type: 'user/login',
            payload: {
                login_type: 'password',
                username: this.data.username,
                password: this.data.password,
            },
            callback: (e) => {
                if (e.code === 0) {
                    navigation.goBack()
                } else {
                    fa.toast.show({
                        title: e.msg
                    })
                }
            }
        })
    },
    onWechatLoginSuccess() {
        navigation.goBack()
    },
    onWechatLoginFail() {
        fa.toast.show({
            title: "授权失败"
        })
    },
    bindUsername(event) {
        this.setData({
            username: event.detail.value
        })
    },
    bindPassword(event) {
        this.setData({
            password: event.detail.value
        })
    },
    onFindPassword() {
        navigation.navigate('user/findPassword')
    },
    onLinkPress(e) {
        const { type } = e.currentTarget.dataset
        switch (type) {
            case 'privacy':
                navigation.navigate('webView', {
                    title: "隐私政策",
                    src: privacyUrl
                })
                break
            case 'agreement':
                navigation.navigate('webView', {
                    title: "用户协议",
                    src: agreementUrl
                })
                break
        }
    },
    onCheckChange() {
        this.setData({
            checked: !this.data.checked
        })
    },
    onPressLogin() {
        if (!this.data.checked) {
            Toast.fail("您未同意并阅读用户协议和隐私政策")
            return false
        }
    },

    onRegister(){
        navigation.navigate('user/register')
    }

}))
