import UserModel from '../../../models/user'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import fa from '../../../utils/fa'
import validator from "../../../libs/validator/validator"

Page({
    userModel: new UserModel(),
    data: {
        login_type: 'password',
        username: '13502176003',
        password: '123456',
    },
    onLoad: async function () {

    },
    async passwordLogin() {
        if (validator.isEmpty(this.data.username) === true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
            return
        }
        if (validator.isEmpty(this.data.password) === true) {
            fa.toast.show({
                title: fa.code.parse('user_password_require')
            })
            return
        }
        if (validator.isMobilePhone(this.data.username, 'zh-CN') !== true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
        }

        const result = await this.userModel.login({
            login_type: 'password',
            username: this.data.username,
            password: this.data.password,
        })
        if (result) {
            fa.cache.set('user_token', result)
            const user_info = await this.userModel.self()
            fa.cache.set('user_info', user_info)
        } else {
            fa.toast.show({
                title: fa.code.parse(this.userModel.getException().getCode())
            })
        }
    },
    async _wechatLogin(data) {
        const userModel = this.userModel
        const token = await userModel.login(data)
        if (token) {
            fa.cache.set('user_token', token)
            const user_info = await userModel.self()
            fa.cache.set('user_info', user_info)
        } else {
            return false
        }
    },
    async wechatRegister() {
        const self = this
        const userModel = this.userModel
        const result = await wx.login({
            success: async function (res) {
                if (res.code) {
                    const code = res.code
                    wx.getUserInfo({
                        withCredentials: true,
                        success: async function (userResult) {
                            const register = await userModel.register({
                                register_type: 'wechat_mini',
                                wechat_mini_param: {
                                    code: code,
                                    encryptedData: userResult.encryptedData,
                                    iv: userResult.iv
                                }
                            })
                            if (register) {
                                await wx.login({
                                    success: async function (loginResult) {
                                        await self._wechatLogin({
                                            login_type: 'wechat_mini',
                                            wechat_mini_code: loginResult.code
                                        })
                                    }
                                })
                            } else {
                                fa.toast.show({
                                    title: fa.code.parse(userModel.getException().getCode())
                                })
                            }
                        }
                    })
                } else {
                    fa.toast.show({
                        title: res.errMsg
                    })
                }
            }
        })
        console.log(result)
    },

    async wechatLogin() {
        const self = this
        const result = await wx.login({
            success: async function (res) {
                const login = await self._wechatLogin({
                    login_type: 'wechat_mini',
                    wechat_mini_code: res.code
                })
                if (login === false) {
                    self.wechatRegister()
                }
            }
        });
        console.log(result)
        console.log('最后才应该是我')
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
    }
})