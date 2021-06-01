import fa from "@/utils/fa";

export default {
    async calculate(params = {}) {
        return await fa.request(
            {
                url: `buy/calculate`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async create(params = {}) {
        return await fa.request(
            {
                url: `buy/create`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `buy/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async pay(params = {}) {
        return await fa.request(
            {
                url: `buy/pay`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
