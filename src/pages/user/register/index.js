import connect from "@/utils/connect";
import navigation from "@/utils/navigation"
import Toast from "@/utils/toast";
import { privacyUrl, agreementUrl } from "@/api";

Page(connect(({ user, loading }) => ({
    login: user.login,
    userLoginLoading: loading.effects["user/login"],
}))({
    data: {
        username: '',
        checked: true,
        sendSuccess: false
    },
    onSubmit(e) {
        const { username, password, verify_code } = e.detail.value
        const { checked } = this.data
        if (!checked) {
            return Toast.fail("您未同意并阅读用户协议和隐私政策")
        }
        if (username.length !== 11) {
            return Toast.info('手机格式错误')
        }
        if (verify_code.length < 4) {
            return Toast.info('验证码格式错误')
        }
        if (password.length < 6) {
            return Toast.info('密码格式错误')
        }
        const { dispatch } = this
        dispatch({
            type: 'user/register',
            payload: {
                register_type: 'password',
                channel_type: 'sms',
                username,
                password,
                verify_code
            },
            callback: (e) => {
                if (e.code === 0) {
                    navigation.goBack()
                } else {
                    Toast.info(e.msg)
                }
            }
        })
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
    onInputUsername(e) {
        this.setData({ username: e.detail.value })
    },
    onCheckChange() {
        this.setData({
            checked: !this.data.checked
        })
    },
    onStart() {

    },
    onEnd() {
        this.setData({
            sendSuccess: false
        })
    },
    onSendCode() {
        const { dispatch } = this
        const { username, sendSuccess } = this.data;
        if (sendSuccess === false) {
            if (!username || username.length !== 11) {
                return Toast.info('请输入手机号')
            } else {
                dispatch({
                    type: "verifyCode/add",
                    payload: {
                        channel_type: "sms",
                        behavior: "register",
                        receiver: username,
                    },
                    callback: (e) => {
                        if (e.code === 0) {
                            this.setData({
                                sendSuccess: true
                            })
                        } else {
                            Toast.info('验证码发送失败')
                        }
                    }
                })
            }
        }
    },
}))
