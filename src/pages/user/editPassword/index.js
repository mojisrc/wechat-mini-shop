import fa from "@/utils/fa";
import userServices from "@/services/user"
Page({
    data: {
        oldpassword: null,
        password: null,
        confirmpassword: null
    },
    async onSubmit() {
        const { oldpassword, password, confirmpassword } = this.data;
        if (!oldpassword) {
            return fa.toast.show({ title: '请输入旧密码' })
        }
        if (!password) {
            return fa.toast.show({ title: '请输入密码' })
        }
        if (password !== confirmpassword) {
            return fa.toast.show({ title: '两次新密码不一致' })
        }
        if (oldpassword === password) {
            return fa.toast.show({ title: '新密码不能与旧密码一样' })
        }
        const result = await userServices.editPassword({
            oldpassword, password
        })
        if (result.code !== 0) {
            fa.toast.show({
                title: result.msg
            })
        } else {
            fa.toast.show({
                title: "修改成功"
            })
            wx.navigateBack({
                delta: 1
            })
        }
    },
    onOldPasswordChange(e) {
        this.setData({
            oldpassword: e.detail.value
        })
    },
    onPasswordChange(e) {
        this.setData({
            password: e.detail.value
        })
    },
    onConfirmPasswordChange(e) {
        this.setData({
            confirmpassword: e.detail.value
        })
    },
})
