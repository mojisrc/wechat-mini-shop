import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `goods/evaluateList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async mine(params = {}) {
        return await fa.request(
            {
                url: `goodsevaluate/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `goodsevaluate/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async append(params = {}) {
        return await fa.request(
            {
                url: `goodsevaluate/append`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `goodsevaluate/detail`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async isEvaluated(params = {}) {
        return await fa.request(
            {
                url: `goodsevaluate/isEvaluated`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
