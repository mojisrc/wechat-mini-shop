import Shy from "@/utils/shy"
import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import Dialog from '@vant/weapp/dialog/dialog';
import navigation from "@/utils/navigation"

Page(connect(({ user }) => ({
    login: user.login,
    isBindPhone: user.isBindPhone
}))({
    data: {
        shyPhone: null
    },
    init() {
        const { dispatch } = this
        dispatch({
            type: 'user/self',
            callback: (e) => {
                if (e) {
                    const { phone } = e || {}
                    const isBindPhone = !!(phone && phone.length === 11)
                    const shyPhone = isBindPhone ? Shy.phone(phone) : ''
                    this.setData({
                        shyPhone
                    })
                }
            }
        })
    },
    onShow() {
        this.init()
    },
    onBindPhone() {
        const { isBindPhone } = this.data
        const { dispatch } = this
        if (isBindPhone) {
            Dialog.confirm({
                title: '提示',
                message: '您确认要解绑吗',
                beforeClose: (action) => {
                    if (action === 'confirm') {
                        dispatch({
                            type: 'user/unbindPhone',
                            callback: (e) => {
                                if (e.code === 0) {
                                    Toast.success("已解绑")
                                } else {
                                    Toast.info(e.msg)
                                }
                            }
                        })
                    }
                    return true
                }
            })
        } else {
            navigation.navigate('user/setting/bind/phone')
        }
    },
}))
