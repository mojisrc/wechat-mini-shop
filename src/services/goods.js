import fa from "../utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `goods/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `goods/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async brandList(params = {}) {
        return await fa.request(
            {
                url: `goods/brandList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async evaluateList(params = {}) {
        return await fa.request(
            {
                url: `goods/evaluateList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async similarGoods(params = {}) {
        return await fa.request(
            {
                url: `goods/similarGoods`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async brandInfo(params = {}) {
        return await fa.request(
            {
                url: `goods/brandInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async likeGoods(params = {}) {
        return await fa.request(
            {
                url: `goods/likeGoods`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async skuList(params = {}) {
        return await fa.request(
            {
                url: `goods/skuList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async bodyInfo(params = {}) {
        return await fa.request(
            {
                url: `goods/bodyInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
