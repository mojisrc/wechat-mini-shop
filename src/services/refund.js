import fa from "@/utils/fa";

export default {
    async reasonList(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/reasonList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async apply(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/apply`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async list(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/info`,
                method: 'GET',
            }, {
                params
            }
        )
    },
    async setTrackingNo(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/setTrackingNo`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async revoke(params = {}) {
        return await fa.request(
            {
                url: `orderrefund/revoke`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
