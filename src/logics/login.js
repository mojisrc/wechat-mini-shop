import UserModel from '../models/user'
import fa from '../utils/fa'
import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
// 如果用户授权了 是不需要调用 getUserInfo 的，但是为了降低bug出现 统一先获得
export default class Login {
    userModel = new UserModel()
    options = {
        success: function () {
        },
        error: function () {
        }
    }

    constructor(options) {
        this.options = Object.assign(this.options, options);
    }

    async _wechatLogin(data) {
        const userModel = this.userModel
        const token = await userModel.login(data)
        if (token) {
            fa.cache.set('user_token', token)
            const user_info = await userModel.self()
            fa.cache.set('user_info', user_info)
            // 回调
            this.options.success({ code: 1 })
        } else {
            this.clearUserInfo()
            return false
        }
    }

    async wechatRegister() {
        const self = this
        const userModel = self.userModel
        await wx.login({
            success: async function (res) {
                if (res.code) {
                    const code = res.code
                    wx.getUserInfo({
                        withCredentials: true,
                        success: async function (userResult) {
                            console.log(userResult)
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
                        },
                        fail: function (error) {
                            self.clearUserInfo()
                            console.log(error)
                        }

                    })
                } else {
                    fa.toast.show({
                        title: res.errMsg
                    })
                }
            }
        })
    }

    // 注意：微信这个异步还不知道怎么写才能行的通  await无效
    async wechatLogin(autoRegister = true) {
        const self = this
        const result = await wx.login({
            success: async function (res) {
                const login = await self._wechatLogin({
                    login_type: 'wechat_mini',
                    wechat_mini_code: res.code
                })
                if (login === false && autoRegister === true) {
                    self.wechatRegister()
                }
            }
        });
    }

    clearUserInfo() {
        fa.cache.set('user_info', null)
        fa.cache.set('user_token', null)
    }
}