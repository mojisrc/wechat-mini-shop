import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `goodscollect/mine`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `goodscollect/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async del(params = {}) {
        return await fa.request(
            {
                url: `goodscollect/del`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async state(params = {}) {
        return await fa.request(
            {
                url: `goodscollect/state`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
