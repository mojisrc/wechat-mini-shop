import fa from "@/utils/fa";

export default {
    async login(params = {}) {
        return await fa.request(
            {
                url: `user/login`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async register(params = {}) {
        return await fa.request(
            {
                url: `user/register`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async logout(params = {}) {
        return await fa.request(
            {
                url: `user/logout`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async token(params = {}) {
        return await fa.request(
            {
                url: `user/token`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async editPassword(params = {}) {
        return await fa.request(
            {
                url: `user/editPassword`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async verifyCode(params = {}) {
        return await fa.request(
            {
                url: `verifyCode/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async self(params = {}) {
        return await fa.request(
            {
                url: `user/self`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async editPasswordByFind(params = {}) {
        return await fa.request(
            {
                url: `user/editPasswordByFind`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async editProfile(params = {}) {
        return await fa.request(
            {
                url: `user/editProfile`,
                method: 'POST',
            }, {
                params
            }
        )
    },
    async bindPhone(params = {}) {
        return await fa.request(
            {
                url: `user/bindPhone`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async bindWechat(params = {}) {
        return await fa.request(
            {
                url: `user/bindWechat`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async unbindWechat(params = {}) {
        return await fa.request(
            {
                url: `user/unbindWechat`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async unbindPhone(params = {}) {
        return await fa.request(
            {
                url: `user/unbindPhone`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async evaluatedList(params = {}) {
        return await fa.request(
            {
                url: `user/evaluatedList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async assetsInfo(params = {}) {
        return await fa.request(
            {
                url: `user/assetsInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async bindWechatPhone(params = {},header={}) {
        return await fa.request(
            {
                url: `user/bindWechatPhone`,
                method: 'POST'
            }, {
                params,
                header
            }
        )
    },
}
