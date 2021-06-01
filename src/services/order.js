import fa from "@/utils/fa";

export default {
    async stateNum(params = {}) {
        return await fa.request(
            {
                url: `order/stateNum`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async list(params = {}) {
        return await fa.request(
            {
                url: `order/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `order/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async cancel(params = {}) {
        return await fa.request(
            {
                url: `order/cancel`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async confirmReceipt(params = {}) {
        return await fa.request(
            {
                url: `order/confirmReceipt`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async deliverInfo(params = {}) {
        return await fa.request(
            {
                url: `order/deliverInfo`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async logistics(params = {}) {
        return await fa.request(
            {
                url: `order/logisticsQuery`,
                method: 'GET',
            }, {
                params
            }
        )
    },
    async goodsList(params = {}) {
        return await fa.request(
            {
                url: `order/goodsList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async goodsInfo(params = {}) {
        return await fa.request(
            {
                url: `order/goodsInfo`,
                method: 'GET',
            }, {
                params
            }
        )
    },
}
