import verifyCodeServices from "@/services/verifyCode"
import fa from "@/utils/fa";
import userServices from "@/services/user"
import miniCode from "@/utils/miniCode";
import Toast from "@/utils/toast";
import navigation from "@/utils/navigation";
import connect from "@/utils/connect";
import userApi from "@/services/user"

Page(connect(({ user }) => ({
    login: user.login,
    isBindPhone: user.isBindPhone
}))({
    data: {
        phone: null,
        verify_code: null,
        password: null,
        sendSuccess: false
    },
    options: {},
    onLoad(options) {
        this.options = options
    },
    onShow() {
        this.init()
    },
    init() {
        miniCode.refresh()
    },
    async onPress() {
        const { phone, sendSuccess } = this.data;
        if (sendSuccess === false) {
            if (!phone || phone.length !== 11) {
                return fa.toast.show({ title: '请输入手机号' })
            } else {
                const result = await verifyCodeServices.add({
                    channel_type: "sms",
                    behavior: "bind_phone",
                    receiver: phone,
                })
                if (result.code === 0) {
                    this.setData({
                        sendSuccess: true
                    })
                } else {
                    fa.toast.show({ title: result.msg })
                }
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
        const result = await userServices.bindPhone({
            phone, verify_code, password
        })
        if (result.code !== 0) {
            miniCode.refresh()
            fa.toast.show({
                title: result.msg
            })
        } else {
            // todo 刷新用户状态
            fa.toast.show({
                title: "绑定成功"
            })
            wx.navigateBack({
                delta: 1
            })
        }
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
    async onBindWechatPhone(event) {
        const { encryptedData, errMsg, iv } = event.detail
        const code = miniCode.getCode()
        try {
            if (errMsg === 'getPhoneNumber:ok') {
                wx.showLoading({
                    title: '授权中',
                })
                const userRes = await userApi.bindWechatPhone({
                    wechat_mini_param: {
                        code,
                        encryptedData,
                        iv
                    }
                }, {
                    'Access-Token': this.options.access_token
                })
                wx.hideLoading()
                if (userRes.code === 0) {
                    Toast.success('绑定成功')
                    navigation.goBack()
                } else {
                    wx.showModal({
                        title: '绑定失败',
                        content: `${userRes.msg}，去绑定其他手机号`,
                    })
                }
            } else {
                Toast.info('您拒绝了手机授权')
            }
        } catch (e) {
            console.warn(e)
        }
    },
}))
