import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import navigation from "@/utils/navigation";

Page(connect(({ user, loading }) => ({
    login: user.login,
    userInfo: user.self,
    loading: loading.effects['user/editProfile']
}))({
    data: {
        avatar: "",
        nickname: ''
    },
    onShow() {
    },
    onUploadSuccess(e) {
        this.setData({
            avatar: e.detail.path,
        })
    },
    onSubmit(e) {
        const { userInfo, avatar } = this.data
        const { nickname } = e.detail.value || {}
        const { loading, login } = this.data
        if (!login || loading) return
        this.dispatch({
            type: 'user/editProfile',
            payload: {
                nickname,
                avatar: avatar ? avatar : userInfo.profile.avatar
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
}))
