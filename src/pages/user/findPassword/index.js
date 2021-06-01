import fa from "@/utils/fa";
import connect from "@/utils/connect";

Page(connect(({ user, loading }) => ({
    submitLoading: loading.effects["user/editPasswordByFind"],
}))({
    data: {
        phone: null,
        verify_code: null,
        password: null,
        sendSuccess: false
    },
    onPress() {
        const { dispatch } = this
        const { phone, sendSuccess } = this.data;
        if (sendSuccess === false) {
            if (!phone || phone.length !== 11) {
                return fa.toast.show({ title: '请输入手机号' })
            } else {
                dispatch({
                    type: "verifyCode/add",
                    payload: {
                        channel_type: "sms",
                        behavior: "find_password",
                        receiver: phone,
                    },
                    callback: (e) => {
                        if (e.code === 0) {
                            this.setData({
                                sendSuccess: true
                            })
                        } else {
                            fa.toast.show({ title: "验证码发送失败" })
                        }
                    }
                })
            }
        }
    },
    onStart() {

    },
    onEnd() {
        this.setData({
            sendSuccess: false
        })
    },
    async onSubmit() {
        const { phone, verify_code, password } = this.data;
        if (!phone) {
            return fa.toast.show({ title: '请输入手机号' })
        }
        if (!verify_code) {
            return fa.toast.show({ title: '请输入验证码' })
        }
        if (!password) {
            return fa.toast.show({ title: '请输入密码' })
        }
        const { dispatch } = this
        dispatch({
            type: 'user/editPasswordByFind',
            payload: {
                phone, verify_code, password
            },
            callback: (e) => {
                if (e.code === 0) {
                    fa.toast.show({
                        title: "操作成功"
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    fa.toast.show({
                        title: e.msg
                    })
                }

            }
        })
    },
    onPhoneChange(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    onVerifyCodeChange(e) {
        this.setData({
            verify_code: e.detail.value
        })
    },
    onPasswordChange(e) {
        this.setData({
            password: e.detail.value
        })
    },
}))
