import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `cart/list`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `cart/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async edit(params = {}) {
        return await fa.request(
            {
                url: `cart/edit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async del(params = {}) {
        return await fa.request(
            {
                url: `cart/del`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async exist(params = {}) {
        return await fa.request(
            {
                url: `cart/exist`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `cart/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async check(params = {}) {
        return await fa.request(
            {
                url: `cart/check`,
                method: 'POST',
            }, {
                params
            }
        )
    },
    async destroy(params = {}) {
        return await fa.request(
            {
                url: `cart/destroy`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async totalNum(params = {}) {
        return await fa.request(
            {
                url: `cart/totalNum`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async usefulPoints(params = {}) {
        return await fa.request(
            {
                url: `cart/usefulPoints`,
                method: 'POST'
            }, {
                params
            }
        )
    },

}
