import fa from "@/utils/fa";

export default {
    async myCardInfo(params = {}) {
        return await fa.request(
            {
                url: `membercard/myCardInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async list(params = {}) {
        return await fa.request(
            {
                url: `membercard/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async myCard(params = {}) {
        return await fa.request(
            {
                url: `membercard/myCard`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `membercard/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async create(params = {}) {
        return await fa.request(
            {
                url: `membercard/create`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async orderInfo(params = {}) {
        return await fa.request(
            {
                url: `membercard/orderInfo`,
                method: 'GET'
            }, {
                params
            },
        )
    },
    async highest(params = {}) {
        return await fa.request(
            {
                url: `membercard/highest`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
